# Second Chance Tails

Second Chance Tails is a dynamic Next.js shelter website with:

- a public rescue/adoption/donation site
- a built-in admin panel at `/admin`
- SQLite-backed content and form submissions
- local upload storage for shelter images

This project is no longer a static export site. It needs Node.js hosting.

## Core features

- Public pages for home, dogs, updates, recoveries, adoption, volunteer, donate, contact, and emergency help
- Admin dashboard for settings, dog profiles, updates, and incoming forms
- Real adoption and volunteer submissions stored in the database
- Shared rescue and WhatsApp number support
- Shelter updates, donor stories, and visitor notes managed without editing code

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local`:

```env
ADMIN_PASSWORD=your-secure-password
ADMIN_SESSION_SECRET=replace-this-with-a-long-random-secret
```

3. Start the app:

```bash
npm run dev
```

4. Open:

- `http://localhost:3000`
- `http://localhost:3000/admin/login`

## Admin login

- The admin password is read from `ADMIN_PASSWORD`
- If no env file exists, the fallback password is `change-this-password`
- Change that before any real deployment

## Data and uploads

This app currently stores content locally:

- database: `.data/shelter.sqlite`
- uploads: `public/uploads/`

That makes a single persistent server the best first deployment target.

## Verification

Available checks:

```bash
npm run typecheck
npm run build
```

## Deployment

Recommended for this codebase right now:

- AWS EC2 with persistent EBS storage
- nginx as a reverse proxy
- PM2 for process management

Deployment guide:

- [AWS_DEPLOYMENT.md](./AWS_DEPLOYMENT.md)

Included server files:

- [ecosystem.config.cjs](./ecosystem.config.cjs)
- [ops/nginx/second-chance-tails.conf](./ops/nginx/second-chance-tails.conf)

## Future scaling path

If traffic and content volume grow, the next step is:

- move uploads to Amazon S3
- move the database to Amazon RDS or another managed SQL service
- then consider ECS, App Runner, or another container-based deployment model
