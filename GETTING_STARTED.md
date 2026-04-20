# Getting Started with Second Chance Tails Website

## Installation & Setup

### Step 1: Install Dependencies

```bash
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- All required dependencies

### Step 2: Run Development Server

```bash
npm run dev
```

The website will be available at: **http://localhost:3000**

## Pages Overview

✅ **Home** (`/`) - Hero, mission, featured dogs, impact stats, how to help  
✅ **Dogs in Our Care** (`/dogs`) - Listing of injured & recovered dogs  
✅ **Dog Details** (`/dogs/[id]`) - Individual dog profiles with full info  
✅ **Adoption** (`/adoption`) - Adoption process & enquiry form  
✅ **Donate** (`/donate`) - Donation info & payment methods  
✅ **Volunteer** (`/volunteer`) - Volunteer roles & application form  
✅ **About Us** (`/about`) - Mission, vision, values, management  
✅ **Emergency Help** (`/emergency`) - 24/7 rescue contact info  
✅ **Contact** (`/contact`) - All contact details & location  

## Key Features

### 1. Mobile-Friendly Design
- Fully responsive on all devices
- Mobile-first approach
- Touch-friendly navigation
- Sticky WhatsApp button on mobile

### 2. Forms (Frontend Ready)
- Adoption enquiry form with validation
- Volunteer application form with checkboxes
- Ready for backend integration

### 3. SEO Optimized
- Meta tags on every page
- Sitemap.xml generated
- Robots.txt configured
- Open Graph tags for social sharing

### 4. Accessibility
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states on all clickable items

## Customization Guide

### Update Contact Details

Edit `src/data/shelter-data.ts`:

```typescript
export const contactInfo = {
  phone: '94940 123456',        // Change this
  whatsapp: '94940 123457',     // Change this
  email: 'secondchancetails26@gmail.com',  // Change this
  address: 'Bowrampet, Hyderabad, Telangana',
  location: {
    lat: 17.5227,   // Update with real coordinates
    lng: 78.4053,
  },
};
```

### Add or Update Dogs

Edit `src/data/shelter-data.ts` - add entries to `dogsData` array:

```typescript
{
  id: '9',
  name: 'New Dog',
  age: '2 years',
  gender: 'Male',
  status: 'Recovered',
  image: '/images/dogs/newdog.jpg',
  images: ['/images/dogs/newdog.jpg', '/images/dogs/newdog-2.jpg'],
  shortDescription: 'Brief description for card',
  fullDescription: 'Full description about the dog',
  rescueStory: 'How this dog was rescued',
  healthStatus: 'Current health status',
  adoptionEligible: true,
}
```

### Update Statistics

Edit `src/data/shelter-data.ts`:

```typescript
export const shelterStats = {
  dogsRescued: 234,
  dogsTreated: 189,
  dogsAdopted: 67,
  activeCases: 80,
};
```

### Add Real Dog Images

1. Create directory: `public/images/dogs/`
2. Add images: `bruno.jpg`, `bella.jpg`, etc.
3. Update image paths in `shelter-data.ts`

Currently, the site uses emoji placeholders (🐕) that automatically display each dog's name.

## Backend Integration

### Adoption Form

File: `src/app/adoption/page.tsx`

Replace this section:

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // TODO: Replace with API call
  alert('Thank you for your adoption enquiry!');
};
```

With your API endpoint:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await fetch('/api/adoption', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    // Handle response
  } catch (error) {
    // Handle error
  }
};
```

### Volunteer Form

File: `src/app/volunteer/page.tsx` - Same approach as adoption form.

## Production Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in `.next/` folder.

### Start Production Server (Local Test)

```bash
npm start
```

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel auto-detects Next.js
5. Click Deploy

### Deploy to Other Platforms

- **Netlify:** Use Next.js plugin
- **AWS/DigitalOcean:** Use Docker or Node.js setup
- **Cloudflare Pages:** Use adapter for Next.js

## Color Scheme

The site uses a warm, professional color palette:

- **Primary Brown:** `primary-600` - Used for text and accents
- **Accent Green:** `accent-600` - Main action color (buttons, links)
- **Red:** Emergency sections
- **Green:** WhatsApp button
- **Neutral:** Warm whites and grays

Colors are defined in `tailwind.config.js` and can be customized.

## Typography

- **Font:** Inter (Google Fonts)
- **Headers:** Bold, large, readable
- **Body:** 16px base with relaxed line-height
- **Mobile:** Slightly smaller but still readable

## Performance Optimizations

✅ Next.js Image optimization (when images are added)  
✅ Code splitting with App Router  
✅ CSS optimization with Tailwind  
✅ Static page generation where possible  
✅ Lazy loading of components  

## Browser Testing Checklist

Test on:
- ✅ Chrome (Desktop & Mobile)
- ✅ Safari (Desktop & Mobile)
- ✅ Firefox
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## Mobile-Specific Features

1. **Sticky WhatsApp Button** - Bottom right corner on all pages
2. **Collapsible Navigation** - Hamburger menu on mobile
3. **Touch-Friendly Buttons** - Large tap targets (minimum 44px)
4. **Readable Text** - No tiny fonts
5. **Optimized Forms** - Mobile-friendly input fields

## Support & Maintenance

### Update Dog Status

When a dog is adopted or recovers, update `src/data/shelter-data.ts`.

### Regular Updates

- Update statistics monthly
- Add new rescued dogs to listings
- Update donation transparency info
- Keep contact information current

## Troubleshooting

### Port 3000 already in use?

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

### Build errors?

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Styling issues?

```bash
# Make sure Tailwind is compiling
# Check tailwind.config.js paths are correct
```

## Project Structure

```
src/
├── app/                    # Pages using App Router
│   ├── layout.tsx         # Root layout (Header + Footer)
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global Tailwind styles
│   ├── dogs/              # Dog pages
│   ├── adoption/          # Adoption page
│   ├── donate/            # Donate page
│   ├── volunteer/         # Volunteer page
│   ├── about/             # About page
│   ├── emergency/         # Emergency page
│   ├── contact/           # Contact page
│   ├── not-found.tsx      # 404 page
│   ├── robots.ts          # SEO robots.txt
│   └── sitemap.ts         # SEO sitemap
├── components/
│   ├── layout/
│   │   ├── Header.tsx     # Main navigation
│   │   └── Footer.tsx     # Site footer
│   └── ui/
│       ├── DogCard.tsx    # Dog listing card
│       ├── StatCard.tsx   # Statistics display
│       ├── SectionHeader.tsx
│       ├── HowToHelpCard.tsx
│       └── WhatsAppButton.tsx  # Sticky WhatsApp
└── data/
    └── shelter-data.ts    # All data (dogs, stats, contact)
```

## Need Help?

Refer to:
- Full README.md for detailed documentation
- Next.js docs: https://nextjs.org/docs
- Tailwind CSS docs: https://tailwindcss.com/docs

---

Built with care for Second Chance Tails 🐾


