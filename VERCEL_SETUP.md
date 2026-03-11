# 🚀 رفع ProScholarsTools على Vercel — دليل خطوة بخطوة

## الطريقة 1: رفع مباشر (بدون GitHub) — الأسرع

1. اذهب إلى **vercel.com** وسجّل دخول
2. اضغط **Add New → Project**
3. اضغط **"Import from ZIP"** أو اسحب مجلد الموقع مباشرة
4. في إعدادات المشروع:
   - **Framework Preset:** Other
   - **Root Directory:** `.` (نفس المجلد)
   - **Output Directory:** `public`
5. اضغط **Deploy**

---

## الطريقة 2: عبر GitHub (الأفضل للتحديثات المستقبلية)

1. ارفع الملفات على GitHub repository جديد
2. اذهب إلى vercel.com → **New Project**
3. اختر الـ repository من GitHub
4. Vercel يكتشف الإعدادات تلقائياً من vercel.json
5. اضغط **Deploy**

---

## ⚠️ إضافة ANTHROPIC_API_KEY (مهم جداً — بدونه الأدوات لا تعمل)

1. بعد الرفع → اذهب للمشروع → **Settings → Environment Variables**
2. اضغط **Add New**
3. Name: `GEMINI_API_KEY`
4. Value: مفتاحك من aistudio.google.com/apikey
5. Environment: ✅ Production ✅ Preview ✅ Development
6. اضغط **Save**
7. اضغط **Redeploy** لتطبيق التغيير

---

## ✅ التحقق بعد الرفع

افتح هذه الروابط وتأكد تعمل:
- `/` — الصفحة الرئيسية مع الفيديو
- `/tools` — كل الأدوات
- `/pricing` — صفحة الاشتراك مع Gumroad
- `/about` — من نحن
- `/api` — يجب أن يرجع `Method not allowed` (يعني الـ function تعمل)

---

## 🌐 ربط النطاق المخصص proscholartools.com

1. Project → **Settings → Domains**
2. اضغط **Add Domain**
3. اكتب: `proscholartools.com`
4. Vercel سيعطيك DNS records — أضفها في سجلات نطاقك
5. اضغط **Verify**

---

## حد الإنفاق على Anthropic API

✅ Gemini API مجاني 100% — لا تحتاج ضبط حد إنفاق!
اذهب إلى aistudio.google.com/apikey وانسخ مفتاحك فقط.
