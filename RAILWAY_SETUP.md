# 🚂 Deploy Backend ke Railway.app

Railway adalah platform yang perfect untuk deploy Node.js servers. Gratis dengan beberapa limitasi.

## Step 1: Setup Railway Account

1. Buka https://railway.app
2. Sign up dengan GitHub
3. Authorize Railway

## Step 2: Create New Project

1. Klik **Create New Project**
2. Pilih **Deploy from GitHub**
3. Select repository: `eginazmu1/Link-Shortener`
4. Authorize Railway untuk akses GitHub

## Step 3: Configure Backend

1. **Select Service**: Pilih folder `backend`
2. Railway akan auto-detect sebagai Node.js project
3. Klik **Deploy**

Tunggu sampai deployment selesai (akan muncul status "Success").

## Step 4: Add Environment Variables

Setelah deployment selesai:

1. Di Railway dashboard, klik project Anda
2. Klik tab **Variables**
3. Add variables:
   ```
   MONGODB_URI = mongodb+srv://eginazmumuqtapi98_db_user:ZIP3e5hXkuksohHL@linkshortener.b8mie2f.mongodb.net/?appName=LinkShortener
   JWT_SECRET = N2EzYThmYmYtOWJkZS00YmU4LWI0MTctNzJlMzQwYTk2NDgw0e096ac0-ff85-4c12-bca0-4a77df38c7d7
   FRONTEND_URL = https://link-shortener-jm7t.vercel.app
   NODE_ENV = production
   ```
4. Klik **Add**
5. Railway akan auto-redeploy

## Step 5: Get Backend Domain

1. Di Railway dashboard, klik **Deployments**
2. Cari URL domain (format: `https://xxxx-production.up.railway.app`)
3. Copy URL ini

## Step 6: Update Frontend

Update `NEXT_PUBLIC_API_URL` di frontend:

1. Update `.env` lokal:

   ```
   NEXT_PUBLIC_API_URL=https://xxxx-production.up.railway.app
   ```

2. Update di Vercel Frontend settings:

   - https://vercel.com/link-shortener-jm7t/settings/environment-variables
   - Update: `NEXT_PUBLIC_API_URL` = Railway domain
   - Save
   - Redeploy

3. Update hardcoded URLs di frontend files (login, register, dashboard, etc):

   - Ganti semua `https://link-shortenerfix.vercel.app` dengan Railway domain

4. Push ke GitHub dan Vercel akan auto-redeploy

## Step 7: Test

1. Buka https://link-shortener-jm7t.vercel.app/auth/register
2. Coba register
3. Seharusnya sukses! ✅

## Railway Features

- **Unlimited projects** (gratis tier)
- **Auto-redeploy** dari GitHub
- **Environment variables** management
- **Logs** monitoring
- **Custom domains** (premium)

## Monitoring

Track backend health:

1. Railway dashboard → Project → Deployments
2. Lihat status dan logs real-time
3. Klik deployment untuk detail logs

---

**Setelah Railway deploy sukses, aplikasi Anda akan fully operational! 🚀**
