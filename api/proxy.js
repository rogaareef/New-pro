// ProScholarsTools — API Proxy for Vercel
// Powered by Google Gemini API (FREE — 1,500 requests/day, no credit card)

const MAX_INPUT_CHARS = 4000;
const MODEL           = 'gemini-2.0-flash';

export default async function handler(req, res) {

  const origin  = req.headers['origin'] || '';
  const allowed = ['proscholartools.com', 'localhost', '127.0.0.1', 'vercel.app', '.vercel.app'];
  const isAllowed = allowed.some(d => origin.includes(d));

  // CORS headers
  const corsOrigin = isAllowed ? origin : 'https://proscholartools.com';
  res.setHeader('Access-Control-Allow-Origin', corsOrigin);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });
  if (!isAllowed)              return res.status(403).json({ error: 'Forbidden' });

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const { messages } = body || {};

  if (!Array.isArray(messages) || !messages.length)
    return res.status(400).json({ error: 'Missing messages' });

  if (messages.length > 6)
    return res.status(400).json({ error: 'Too many messages.' });

  for (const m of messages) {
    if (typeof m?.content !== 'string' || !['user', 'assistant'].includes(m?.role))
      return res.status(400).json({ error: 'Invalid message format.' });
  }

  const inputText = messages.map(m => m.content).join('');
  if (inputText.length > MAX_INPUT_CHARS)
    return res.status(400).json({ error: `Input too long (max ${MAX_INPUT_CHARS} characters).` });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey)
    return res.status(500).json({ error: 'Service temporarily unavailable.' });

  try {
    // Convert messages format: Anthropic → Gemini
    // Gemini uses { role: 'user'/'model', parts: [{ text }] }
    const geminiContents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: geminiContents,
          generationConfig: {
            maxOutputTokens: 1200,
            temperature: 0.7,
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
          ]
        }),
      }
    );

    const data = await resp.json();

    if (!resp.ok) {
      const errMsg = data?.error?.message || 'Service error. Please try again.';
      return res.status(resp.status).json({ error: errMsg });
    }

    // Extract text from Gemini response
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!text) {
      return res.status(500).json({ error: 'No response from AI. Please try again.' });
    }

    // Return in same format as before so all HTML pages work unchanged
    return res.status(200).json({
      content: [{ type: 'text', text }],
      _meta: { model: MODEL, tier: 'free' }
    });

  } catch (err) {
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
}
