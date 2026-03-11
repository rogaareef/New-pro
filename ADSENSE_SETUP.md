# إعداد AdSense — خطوات بعد القبول

## عند قبول حسابك في AdSense:

### الخطوة 1 — أنشئ وحدات إعلانية
اذهب لـ AdSense → Ads → By ad unit → Create new ad unit

أنشئ 3 وحدات:
1. **Header Banner** — 728×90 Leaderboard
2. **In-Content** — Responsive (auto)
3. **Rectangle** — 300×250

### الخطوة 2 — استبدل SLOT_ID_HERE
كل ملف HTML يحتوي على `data-ad-slot="SLOT_ID_HERE"`
استبدلها بالأرقام الحقيقية من AdSense dashboard.

**الأسرع:** شغّل هذا الأمر مع رقم الـ slot الحقيقي:
```bash
find public/ -name "*.html" -exec sed -i 's/SLOT_ID_HERE/YOUR_REAL_SLOT_ID/g' {} +
```

### الخطوة 3 — ضع Auto Ads أيضاً
في AdSense → Ads → By site → أضف موقعك → فعّل Auto Ads
هذا يضيف إعلانات تلقائية إضافية بدون تعديل الكود.

## ملاحظة مهمة
حتى بدون SLOT_ID صحيح، إذا فعّلت Auto Ads ستظهر الإعلانات تلقائياً.
