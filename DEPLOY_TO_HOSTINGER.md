# Deploying to Hostinger - Complete Guide

> Legacy note: this document describes the old static-export workflow. The project now runs as a dynamic Next.js app with SQLite storage, uploads, admin auth, and real form handling, so it requires Node-capable hosting with writable disk access.

## Step 1: Build the Static Website

Run this command to generate the `out` folder with static files:

```bash
npm run build
```

This will create an `out` folder with all static HTML, CSS, and JavaScript files.

## Step 2: What You'll Get

After running `npm run build`, you'll have:

```
out/
├── index.html              # Home page
├── dogs.html               # Dogs listing
├── dogs/
│   ├── 1.html             # Individual dog pages
│   ├── 2.html
│   └── ...
├── adoption.html
├── donate.html
├── volunteer.html
├── about.html
├── emergency.html
├── contact.html
├── _next/                  # Next.js assets (CSS, JS)
└── ...
```

## Step 3: Upload to Hostinger

### Option A: Using File Manager (Hostinger Control Panel)

1. **Login to Hostinger Control Panel**
   - Go to hpanel.hostinger.com
   - Login with your credentials

2. **Open File Manager**
   - Navigate to "Files" → "File Manager"
   - Go to `public_html` folder (or your domain's root folder)

3. **Clear Existing Files** (if any)
   - Delete old files in `public_html`
   - Keep `.htaccess` if it exists

4. **Upload the `out` Folder Contents**
   - Click "Upload Files"
   - Select ALL files from the `out` folder
   - Upload them to `public_html` (NOT inside a subfolder)
   - Wait for upload to complete

### Option B: Using FTP

1. **Get FTP Credentials**
   - In Hostinger panel, go to "Files" → "FTP Accounts"
   - Note your FTP hostname, username, and password

2. **Use FTP Client** (FileZilla recommended)
   - Download FileZilla from https://filezilla-project.org/
   - Connect using your FTP credentials:
     - Host: ftp.yourdomain.com
     - Username: your_ftp_username
     - Password: your_ftp_password
     - Port: 21

3. **Upload Files**
   - Navigate to `public_html` on remote side
   - Upload ALL contents of `out` folder (not the folder itself)

## Step 4: Configure .htaccess (Important!)

Create/update `.htaccess` file in `public_html` with this content:

```apache
# Enable Rewrite Engine
RewriteEngine On

# Remove .html extension from URLs
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([^\.]+)$ $1.html [NC,L]

# Force trailing slash
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} !(.*)/$
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1/ [L,R=301]

# Force HTTPS (recommended)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Error Documents
ErrorDocument 404 /404.html
ErrorDocument 500 /500.html

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
</IfModule>
```

## Step 5: Verify Deployment

1. Visit your domain: `https://yourdomain.com`
2. Check all pages work:
   - Homepage: `https://yourdomain.com/`
   - Dogs: `https://yourdomain.com/dogs/`
   - Individual dog: `https://yourdomain.com/dogs/1/`
   - All other pages

## Common Issues & Solutions

### Issue 1: 404 Errors on Page Refresh

**Solution:** Make sure `.htaccess` file is uploaded and configured correctly (see Step 4)

### Issue 2: Styles Not Loading

**Solution:** 
- Check that `_next` folder is uploaded
- Clear browser cache
- Verify paths in browser DevTools

### Issue 3: Links Not Working

**Solution:**
- Ensure trailing slashes in URLs
- Update `.htaccess` rewrite rules

### Issue 4: Images Not Showing

**Solution:**
- Images are currently emojis (placeholders)
- To add real images:
  1. Create `images/dogs/` folder in `public_html`
  2. Upload dog photos
  3. They'll work automatically

## Quick Deploy Commands

```bash
# Full deployment process
npm install              # Install dependencies (first time only)
npm run build           # Generate out folder with static files
# Then upload 'out' folder contents to Hostinger
```

## Updating the Website

When you make changes:

1. **Edit the code** locally
2. **Run build** again:
   ```bash
   npm run build
   ```
3. **Upload only changed files** to Hostinger
   - Or upload entire `out` folder again

## File Structure on Hostinger

Your `public_html` should look like this after upload:

```
public_html/
├── index.html
├── dogs.html
├── dogs/
├── adoption.html
├── donate.html
├── volunteer.html
├── about.html
├── emergency.html
├── contact.html
├── _next/
├── .htaccess          # Important!
└── ...
```

## Performance Tips

1. **Enable Cloudflare** (free on Hostinger)
   - In Hostinger panel → Websites → Cloudflare
   - Enables CDN and DDoS protection

2. **Optimize Images** before uploading
   - Use tinypng.com to compress
   - Convert to WebP format

3. **Check Speed**
   - Use PageSpeed Insights: https://pagespeed.web.dev/
   - Should score 90+ on mobile and desktop

## SSL Certificate

Make sure SSL is enabled:
1. Go to Hostinger panel
2. Navigate to "SSL" section
3. Enable free Let's Encrypt SSL
4. Force HTTPS in `.htaccess` (included above)

## Domain Configuration

If using custom domain:
1. Point domain nameservers to Hostinger
2. Wait 24-48 hours for DNS propagation
3. Enable SSL after domain is active

## Backup Strategy

Before major updates:
1. Download current `public_html` folder
2. Keep local backup
3. Upload new version
4. Test thoroughly

## Testing Checklist

After deployment, test:
- [ ] Homepage loads
- [ ] All navigation links work
- [ ] Dogs listing page works
- [ ] Individual dog pages load (test multiple)
- [ ] Forms are visible and styled correctly
- [ ] Mobile view works
- [ ] WhatsApp button functions
- [ ] Emergency contact links work
- [ ] Footer links work
- [ ] 404 page shows for invalid URLs

## Support

If issues persist:
1. Check Hostinger knowledge base
2. Contact Hostinger support
3. Check browser console for errors (F12)

## Deployment Automation (Optional)

For future updates, you can use FTP automation:

```bash
# Install lftp (Linux/Mac)
lftp -e "mirror -R out/ /public_html/ --delete; quit" -u username,password ftp.yourdomain.com
```

---

## Quick Reference

**Build Command:**
```bash
npm run build
```

**Upload Location:**
```
public_html/ (root of your domain)
```

**Must Include:**
- All files from `out` folder
- `.htaccess` file (create manually)

**Test URL:**
```
https://yourdomain.com
```

---

Your website will be live and fully functional on Hostinger! 🚀🐾


