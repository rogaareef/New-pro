# Vercel Web Analytics Setup Guide

This project has been configured to use Vercel Web Analytics.

## Setup Instructions

### 1. Enable Analytics in Vercel Dashboard

To activate Web Analytics for this static HTML site:

1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your project (new-pro)
3. Go to the **Analytics** tab
4. Click the **Enable** button
5. Deploy or redeploy your site

### 2. Automatic Script Injection

Once enabled, Vercel automatically:
- Injects the analytics tracking script into your HTML pages
- Creates routes at `/_vercel/insights/*` for data collection
- Begins collecting visitor data immediately

### 3. Verification

After deployment, verify the setup:

1. Visit your deployed site
2. Open browser DevTools â Network tab
3. Look for requests to `/_vercel/insights/` or similar paths
4. Analytics data will appear in your Vercel Dashboard within 24-48 hours

## For Static HTML Sites

This project uses static HTML files. Vercel Web Analytics works automatically for static sites when:
- The site is deployed on Vercel
- Analytics is enabled in the dashboard
- No manual script injection is required

The `@vercel/analytics` package listed in `package.json` is primarily for documentation and framework-based projects. For pure static HTML, **dashboard enablement is the recommended approach**.

## Alternative: Manual Script Injection

If you prefer explicit control, you can manually add analytics to each HTML file by adding these scripts before the closing `</body>` tag:

```html
<script>
  window.va = window.va || function () { 
    (window.vaq = window.vaq || []).push(arguments); 
  };
</script>
<script defer src="/_vercel/insights/script.js"></script>
```

However, this is **not necessary** as Vercel handles this automatically when Analytics is enabled.

## Resources

- [Vercel Web Analytics Documentation](https://vercel.com/docs/analytics)
- [Quickstart Guide](https://vercel.com/docs/analytics/quickstart)
- [Troubleshooting](https://vercel.com/docs/analytics/troubleshooting)

## Support

If you encounter issues:
- Check that Analytics is enabled in your Vercel Dashboard
- Ensure your site is deployed and promoted to production
- Allow 24-48 hours for data to appear
- Visit [Vercel Support](https://vercel.com/support) for assistance
