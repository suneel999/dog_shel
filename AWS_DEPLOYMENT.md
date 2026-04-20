# AWS Deployment Guide

## Best first AWS setup for this repo

For this app today, the smoothest production setup is:

- one Ubuntu EC2 instance
- one persistent gp3 EBS volume
- nginx in front of the app
- PM2 to keep the app running
- Route 53 for DNS
- Certbot for HTTPS on the instance

This is the right first setup because the app writes data to local disk:

- database: `.data/shelter.sqlite`
- SQLite WAL sidecar files can also appear inside `.data/`
- uploads: `public/uploads/`

That means the app is single-instance by design right now.

## Critical runtime note

This repo imports `node:sqlite`, so **do not deploy it on Node 20**.

Use:

- Node `22.13+` minimum
- Node `22.x LTS` recommended

If you install Node `20.x`, the app can build or start incorrectly because `node:sqlite` is not the right fit there.

## Architecture

```text
Internet
  -> Route 53
  -> EC2 public IP / Elastic IP
  -> nginx
  -> Next.js app on port 3000
  -> local .data/ + public/uploads/ on EBS
```

If you later want AWS-managed TLS and a load balancer, there is an optional `ALB + ACM` path at the bottom of this file.

## 0. Before you start

Have these ready:

- an AWS account
- a domain name
- an EC2 key pair
- your local copy of this project
- the public IP address you will use for SSH

Choose an AWS region close to your expected visitors.

## 1. Launch the EC2 instance

Suggested baseline:

- AMI: `Ubuntu 24.04 LTS`
- instance type: `t3.small`
- disk: `30 GB gp3`

You can use `t3.micro` if traffic will stay very low, but `t3.small` is the safer starting point.

Create one security group with these inbound rules:

- `SSH` on port `22` from **your IP only**
- `HTTP` on port `80` from `0.0.0.0/0`
- `HTTPS` on port `443` from `0.0.0.0/0`

If you enable IPv6, add `::/0` for `80` and `443` as well.

If this is a long-lived production site, attach an Elastic IP to the instance.

## 2. Connect to the server

From your machine:

```bash
ssh -i /path/to/your-key.pem ubuntu@YOUR_SERVER_IP
```

## 3. Install system packages, Node, nginx, and PM2

Run these on the EC2 instance:

```bash
sudo apt update
sudo apt install -y nginx build-essential curl ca-certificates gnupg unzip git snapd
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

Verify the runtime:

```bash
node -v
npm -v
pm2 -v
```

Make sure `node -v` is at least `v22.13.0`.

## 4. Create the app directory

Run on the server:

```bash
sudo mkdir -p /var/www/second-chance-tails
sudo chown -R $USER:$USER /var/www/second-chance-tails
```

## 5. Copy the project to the server

### Option A: clone from a Git remote

If the project lives in GitHub or another Git host:

```bash
cd /var/www
git clone YOUR_REPO_URL second-chance-tails
cd /var/www/second-chance-tails
```

### Option B: upload from your Windows machine

If you are deploying directly from this machine, create a zip without `node_modules`, `.next`, or `out`.

Run this in PowerShell on your local machine:

```powershell
Compress-Archive `
  -Path src, public, ops, package.json, package-lock.json, next.config.js, ecosystem.config.cjs, .env.example, tsconfig.json, tailwind.config.js, postcss.config.js, next-env.d.ts `
  -DestinationPath second-chance-tails.zip `
  -Force
```

Upload it:

```powershell
scp -i C:\path\to\your-key.pem .\second-chance-tails.zip ubuntu@YOUR_SERVER_IP:/tmp/second-chance-tails.zip
```

Then on the server:

```bash
cd /var/www/second-chance-tails
unzip /tmp/second-chance-tails.zip -d /var/www/second-chance-tails
```

## 6. Create the production env file

From the project root on the server:

```bash
cd /var/www/second-chance-tails
cp .env.example .env.local
nano .env.local
```

Set real values:

```env
ADMIN_PASSWORD=use-a-long-strong-password
ADMIN_SESSION_SECRET=generate-a-long-random-secret
```

You can generate a good secret with:

```bash
openssl rand -hex 32
```

## 7. Install dependencies and build the app

From the project root on the server:

```bash
npm ci
npm run build
```

If `npm run build` fails, first re-check `node -v`.

## 8. Prepare writable data directories

This app needs these paths to stay writable across restarts and deploys:

- `.data/`
- `public/uploads/`

Create them explicitly:

```bash
mkdir -p .data public/uploads
chmod -R u+rwX .data public/uploads
```

## 9. Start the app with PM2

This repo already includes `ecosystem.config.cjs`.

From the project root:

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup systemd -u $USER --hp $HOME
```

`pm2 startup` will print one extra command that starts with `sudo`. Run that command too.

Useful checks:

```bash
pm2 status
pm2 logs second-chance-tails
curl http://127.0.0.1:3000
```

## 10. Configure nginx

This repo includes:

- `ops/nginx/second-chance-tails.conf`

Copy it into place:

```bash
sudo cp ops/nginx/second-chance-tails.conf /etc/nginx/sites-available/second-chance-tails
sudo nano /etc/nginx/sites-available/second-chance-tails
```

Change this line:

```nginx
server_name example.com www.example.com;
```

to your real domain.

Then enable the site:

```bash
sudo rm -f /etc/nginx/sites-enabled/default
sudo ln -sf /etc/nginx/sites-available/second-chance-tails /etc/nginx/sites-enabled/second-chance-tails
sudo nginx -t
sudo systemctl reload nginx
```

At this point, visiting `http://YOUR_SERVER_IP` should show the site.

## 11. Point your domain

### If you use Route 53 for DNS

Create:

- an `A` record for the root domain pointing to the Elastic IP
- a `CNAME` record for `www` pointing to the root domain

If your domain is registered somewhere else, create the Route 53 hosted zone and then update the registrar nameservers to the values Route 53 gives you.

Wait for DNS to propagate before moving to HTTPS.

## 12. Add HTTPS with Certbot

Once the domain resolves to the EC2 instance and plain HTTP works, install Certbot:

```bash
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo ln -sf /snap/bin/certbot /usr/local/bin/certbot
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot renew --dry-run
```

After this, nginx should serve the site over HTTPS and renew automatically.

## 13. Smoke test after go-live

Verify all of these:

- homepage loads
- `/admin/login` loads over HTTPS
- admin login works with your real password
- `/dogs` loads
- a dog detail page opens
- adoption form submits
- volunteer form submits
- creating a dog in admin works
- creating an update in admin works
- uploaded images appear on the public site
- `.data/` exists on the server
- `public/uploads/` contains uploaded files

## 14. Safe redeploy process

Before each update, back up the writable content:

- the whole `.data/` directory
- the whole `public/uploads/` directory

Then redeploy:

```bash
cd /var/www/second-chance-tails
npm ci
npm run build
pm2 restart second-chance-tails
```

If you uploaded new source files first, run the same build and restart steps after the upload finishes.

## 15. Backup guidance

Important: because the app enables SQLite WAL mode, do **not** rely on backing up only `.data/shelter.sqlite`.

Back up:

- the whole `.data/` directory
- the whole `public/uploads/` directory

Recommended protection:

- regular EBS snapshots
- one manual backup before each deployment
- one manual backup before major admin changes

## Optional later upgrade: ALB + ACM

If you want a more AWS-native front door later, you can move to:

- Route 53
- ACM certificate
- Application Load Balancer
- EC2 instance as the target

High-level flow:

1. Request an ACM certificate for `yourdomain.com` and `www.yourdomain.com`.
2. Create an Application Load Balancer.
3. Create a target group that forwards to the EC2 instance on port `80`.
4. Keep nginx on the instance and keep Next.js private on port `3000`.
5. Point Route 53 alias records at the ALB.

If you use this model:

- security group on the ALB should allow `80` and `443` from the internet
- security group on the EC2 instance should allow `80` from the ALB security group, not from the whole internet

## Current scaling limitation

This project should stay on one instance until you move shared state off local disk.

To scale horizontally later, migrate:

- uploads to S3
- SQLite to RDS or another shared database

After that, ECS, App Runner, or another multi-instance setup becomes much safer.
