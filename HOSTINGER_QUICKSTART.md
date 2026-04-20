# Hostinger Deployment Quick Start

## ✅ Configuration Complete!

Your Next.js project is now configured for static export to Hostinger.

## 🚀 Deploy in 3 Steps

### Step 1: Build the Website
```bash
npm run build
```
✅ This creates the `out` folder with static files

### Step 2: Upload to Hostinger
- Login to Hostinger File Manager
- Go to `public_html` folder
- Upload ALL contents from `out` folder
- Upload `.htaccess` file (use `.htaccess.example` as template)

### Step 3: Test Your Website
Visit: `https://yourdomain.com`

---

## 📁 What Gets Generated

After `npm run build`, the `out` folder contains:

```
out/
├── index.html              ← Home page
├── dogs.html              ← Dogs listing
├── dogs/
│   ├── 1.html            ← Bruno's page
│   ├── 2.html            ← Bella's page
│   └── ...               ← All dog pages
├── adoption.html
├── donate.html
├── volunteer.html
├── about.html
├── emergency.html
├── contact.html
├── 404.html              ← Error page
├── _next/                ← Styles & JavaScript
│   ├── static/
│   └── ...
└── ...
```

## 📤 Upload Instructions

### Using Hostinger File Manager:

1. **Delete old files in `public_html`** (if any)
   - Keep `.htaccess` if you created it

2. **Select all files from `out` folder**
   - Don't upload the `out` folder itself
   - Upload the CONTENTS of `out` folder

3. **Upload to `public_html` root**
   - NOT in a subfolder
   - Direct to root level

4. **Create `.htaccess` file**
   - Copy content from `.htaccess.example`
   - Save as `.htaccess` in `public_html`

### File Structure on Hostinger:

```
public_html/
├── .htaccess          ← Create this manually
├── index.html         ← From out folder
├── dogs.html          ← From out folder
├── dogs/              ← From out folder
├── _next/             ← From out folder
└── ...all other files from out folder
```

## ✅ Pre-Deployment Checklist

Before building:
- [ ] Updated contact info in `src/data/shelter-data.ts`
- [ ] Added real dog images (optional)
- [ ] Updated statistics
- [ ] Tested locally with `npm run dev`

Before uploading:
- [ ] Ran `npm run build` successfully
- [ ] `out` folder generated
- [ ] All files present in `out` folder

After uploading:
- [ ] Created `.htaccess` file on server
- [ ] All files uploaded to `public_html`
- [ ] SSL certificate enabled in Hostinger
- [ ] Tested all pages on live site

## 🧪 Testing After Deployment

Visit and test these URLs:
- [ ] Homepage: `https://yourdomain.com/`
- [ ] Dogs: `https://yourdomain.com/dogs/`
- [ ] Dog detail: `https://yourdomain.com/dogs/1/`
- [ ] Adoption: `https://yourdomain.com/adoption/`
- [ ] Donate: `https://yourdomain.com/donate/`
- [ ] Volunteer: `https://yourdomain.com/volunteer/`
- [ ] About: `https://yourdomain.com/about/`
- [ ] Emergency: `https://yourdomain.com/emergency/`
- [ ] Contact: `https://yourdomain.com/contact/`

Test on:
- [ ] Desktop browser
- [ ] Mobile browser
- [ ] Test all forms
- [ ] Test WhatsApp button
- [ ] Test navigation

## 🔧 Common Issues

### Issue: 404 errors when refreshing pages
**Solution:** Make sure `.htaccess` is uploaded and configured

### Issue: Styles not loading
**Solution:** 
- Clear browser cache
- Ensure `_next` folder is uploaded
- Check browser console (F12) for errors

### Issue: Wrong paths
**Solution:** All paths should have trailing slashes (e.g., `/dogs/` not `/dogs`)

## 📝 Updating the Website

When you make changes:

```bash
# 1. Make your edits
# 2. Build again
npm run build

# 3. Upload the new 'out' folder contents to Hostinger
```

## 🆘 Need Help?

See detailed guide: `DEPLOY_TO_HOSTINGER.md`

---

## 🎉 You're Ready!

Run `npm run build` now to generate your `out` folder! 🚀


