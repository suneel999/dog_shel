# Adding Real Before & After Photos - Quick Guide

## 📸 Step-by-Step Instructions

### Step 1: Prepare Your Photos

For each dog, you need:
- **Before photo**: When the dog was rescued (injured/sick/malnourished)
- **After photo**: After full recovery (healthy/happy/well-groomed)

**Photo Requirements:**
- Format: JPG or PNG
- Size: At least 800x800px (square is best)
- Quality: Clear, well-lit photos
- File size: Under 2MB each for fast loading

### Step 2: Name Your Photos

Use this naming convention:
```
dogname-before.jpg
dogname-after.jpg
```

**Examples:**
- `bruno-before.jpg` and `bruno-after.jpg`
- `bella-before.jpg` and `bella-after.jpg`
- `rocky-before.jpg` and `rocky-after.jpg`

### Step 3: Create Images Folder

Create this folder structure:
```
public/
  └── images/
      └── dogs/
          ├── bruno-before.jpg
          ├── bruno-after.jpg
          ├── bella-before.jpg
          ├── bella-after.jpg
          └── ... more photos
```

### Step 4: Update the Data File

Open `src/data/shelter-data.ts` and update each dog:

**Before (placeholder):**
```typescript
{
  id: '1',
  name: 'Bruno',
  beforeImage: '/images/dogs/bruno-before.jpg',
  afterImage: '/images/dogs/bruno-after.jpg',
  // ...
}
```

**After (with real photos):**
```typescript
{
  id: '1',
  name: 'Bruno',
  image: '/images/dogs/bruno-after.jpg',           // Main image (after photo)
  images: [
    '/images/dogs/bruno-after.jpg',                // Current photo
    '/images/dogs/bruno-playing.jpg',              // Other current photos
    '/images/dogs/bruno-sitting.jpg',
  ],
  beforeImage: '/images/dogs/bruno-before.jpg',    // When rescued
  afterImage: '/images/dogs/bruno-after.jpg',      // After recovery
  // ... rest of data
}
```

### Step 5: Upload to Project

**If working locally:**
1. Place photos in `public/images/dogs/`
2. Run `npm run build`
3. Upload entire `out` folder to Hostinger

**If uploading directly to Hostinger:**
1. Go to Hostinger File Manager
2. Navigate to `public_html/images/dogs/`
3. Upload all before/after photos
4. Done!

---

## 📐 Image Guidelines

### Good Before Photos
✅ Shows clear injury/illness/condition
✅ Well-lit so condition is visible
✅ Not too graphic (but honest)
✅ Shows the reality of the situation

### Good After Photos
✅ Healthy, happy appearance
✅ Well-groomed and clean
✅ Natural lighting
✅ Shows the dog's personality

### Photo Pairing Tips
- Use similar angles/poses if possible
- Show the same dog in both photos (obviously!)
- Similar background/setting helps comparison
- Don't over-edit - keep it authentic

---

## 🎨 Example: Full Dog Entry with Images

```typescript
{
  id: '1',
  name: 'Bruno',
  age: '3 years',
  gender: 'Male',
  status: 'Recovered',
  
  // Main display image (after recovery)
  image: '/images/dogs/bruno-after.jpg',
  
  // Gallery of current photos
  images: [
    '/images/dogs/bruno-after.jpg',
    '/images/dogs/bruno-playing.jpg',
    '/images/dogs/bruno-sitting.jpg',
  ],
  
  // Transformation images
  beforeImage: '/images/dogs/bruno-before.jpg',   // ← ADD THIS
  afterImage: '/images/dogs/bruno-after.jpg',     // ← ADD THIS
  
  shortDescription: 'A gentle soul who survived a road accident...',
  fullDescription: '...',
  rescueStory: '...',
  healthStatus: '...',
  adoptionEligible: true,
}
```

---

## 📱 Where Before/After Shows Up

Once you add real photos, they'll appear in:

1. **Individual Dog Pages** (`/dogs/1`, `/dogs/2`, etc.)
   - Side-by-side comparison below main image
   - "Transformation Journey" section

2. **Transformations Page** (`/transformations`)
   - Large before/after comparison
   - Full rescue story
   - Professional card layout

3. **Home Page Preview**
   - Transformation teaser section
   - Links to full stories

---

## 🚀 Quick Upload Checklist

- [ ] Photos are properly named
- [ ] Photos are in JPG or PNG format
- [ ] Photos are under 2MB each
- [ ] Created `public/images/dogs/` folder
- [ ] Uploaded all before/after photos
- [ ] Updated `shelter-data.ts` with correct paths
- [ ] Ran `npm run build` locally
- [ ] Uploaded to Hostinger
- [ ] Tested on live site

---

## 🔍 Testing Your Photos

After uploading:

1. Visit `/transformations` page
2. Check each dog's before/after display
3. Visit individual dog pages (e.g., `/dogs/1`)
4. Verify images load correctly
5. Test on mobile view
6. Check image quality and clarity

---

## 💡 Pro Tips

### Optimize Images Before Uploading
Use free tools to compress images:
- [TinyPNG](https://tinypng.com) - Compress without quality loss
- [Squoosh](https://squoosh.app) - Browser-based compression
- Photoshop/GIMP - "Save for Web"

### Recommended Image Specs
- **Dimensions:** 1000x1000px (square)
- **Format:** JPG (for photos)
- **Quality:** 80-85% (good balance)
- **File size:** 100-500KB per image

### Multiple Before/After Photos
If you have multiple transformation stages:
```typescript
beforeImage: '/images/dogs/bruno-day1.jpg',      // Day 1 rescue
afterImage: '/images/dogs/bruno-month3.jpg',     // 3 months later
```

You can also add intermediate photos to the `images` array!

---

## 🎯 Expected Results

**Without real photos:** Emoji placeholders (📷 and ✨)
**With real photos:** Stunning visual transformations that:
- Show your impact clearly
- Build trust with visitors
- Inspire donations
- Create emotional connections
- Prove the quality of your care

---

## 🆘 Troubleshooting

### Photos Not Showing?
1. Check file path spelling (case-sensitive!)
2. Verify photos are in `public/images/dogs/`
3. Make sure file extensions match (`.jpg` vs `.JPG`)
4. Clear browser cache (Ctrl+F5)
5. Check browser console for errors (F12)

### Photos Too Large?
- Compress using TinyPNG
- Resize to 1000x1000px maximum
- Convert PNG to JPG if appropriate

### Wrong Photo Displayed?
- Double-check `beforeImage` and `afterImage` paths
- Verify you're editing the correct dog entry
- Rebuild: `npm run build`

---

## 📧 Need Help?

Check:
- `src/data/shelter-data.ts` - Data file
- `public/images/dogs/` - Photos folder
- Browser DevTools (F12) - Error messages

---

**Your transformation stories will be POWERFUL with real photos! 🐾✨**
