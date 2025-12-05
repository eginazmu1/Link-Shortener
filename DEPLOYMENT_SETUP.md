# 🔗 Link Shortener - Production Deployment Guide

## 📚 Daftar Isi

- [Quick Start](#quick-start)
- [Setup Produksi](#setup-produksi)
- [Deploy ke Vercel](#deploy-ke-vercel)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm run install:all

# Run dev server (frontend + backend)
npm run dev

# Or run separately:
npm run dev:frontend  # Terminal 1 - http://localhost:3000
npm run dev:backend   # Terminal 2 - http://localhost:3001
```

## 🔧 Setup Produksi

### 1. Database Setup (MongoDB)

1. **Buka MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
2. **Create Account** (gratis tier tersedia)
3. **Create Cluster**:

   - Pilih free tier M0
   - Pilih region terdekat
   - Click "Create Cluster"

4. **Get Connection String**:
   - Klik "Connect"
   - Pilih "Drivers"
   - Copy connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/link-shortener?retryWrites=true&w=majority`

### 2. Generate JWT Secret

```bash
# Di Windows PowerShell:
[System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).ToString())) + (New-Guid).ToString()
```

### 3. Prepare Repository

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/link-shortener.git
git push -u origin main
```

## 🌐 Deploy ke Vercel

### Opsi A: Deploy Frontend & Backend di Vercel Terpisah (Recommended)

#### Deploy Backend terlebih dahulu:

1. **Buka Vercel Dashboard**: https://vercel.com/dashboard
2. **Import Project**:

   - Click "Add New" → "Project"
   - Select GitHub repository
   - Pilih import

3. **Configure Backend**:

   ```
   Root Directory: backend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variables** (Settings → Environment Variables):

   ```
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/link-shortener
   JWT_SECRET = [GENERATED_SECRET]
   FRONTEND_URL = https://your-frontend.vercel.app
   NODE_ENV = production
   ```

5. **Deploy** dan catat backend domain: `https://your-backend.vercel.app`

#### Deploy Frontend:

1. **Create New Project** di Vercel
2. **Configure Frontend**:

   ```
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **Add Environment Variables**:

   ```
   NEXT_PUBLIC_API_URL = https://your-backend.vercel.app
   ```

4. **Deploy**

### Opsi B: Deploy di Satu Project Vercel (Monorepo)

1. **Import Repository ke Vercel**
2. **Configure untuk root**:

   ```
   Build Command: cd frontend && npm install && npm run build
   Output Directory: frontend/.next
   Install Command: npm install && cd frontend && npm install && cd ../backend && npm install
   ```

3. **Add Environment Variables** untuk BOTH frontend & backend
4. **Deploy**

## 🧪 Testing

### Test Links Creation

```bash
# 1. Access Frontend
https://your-frontend.vercel.app

# 2. Register/Login
# 3. Create new link
# 4. Test redirect dengan membuka short link di browser baru

# Expected: Browser redirect ke original URL
```

### Test API Directly

```bash
# Get user links
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://your-backend.vercel.app/api/links

# Redirect
curl -L https://your-frontend.vercel.app/abc123
```

## 🔐 Security Checklist

- [ ] JWT_SECRET is strong dan random
- [ ] MongoDB user password yang kompleks
- [ ] Enable 2FA di Vercel
- [ ] CORS origins hanya allow frontend domain
- [ ] HTTPS enforced (Vercel default)
- [ ] Database backups enabled di MongoDB Atlas
- [ ] Regular security updates

## 📝 Environment Variables Reference

### Backend (`backend/.env`)

```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=your-secret-key
FRONTEND_URL=https://frontend.vercel.app
NODE_ENV=production
PORT=3001
```

### Frontend (`frontend/.env.local`)

```
NEXT_PUBLIC_API_URL=https://backend.vercel.app
```

## 🐛 Troubleshooting

### ❌ 404 pada redirect

**Solusi:**

- Check middleware.ts di frontend
- Verify short code ada di database
- Check logs di Vercel: `vercel logs`

### ❌ CORS Error

**Solusi:**

```typescript
// backend/src/main.ts
app.enableCors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
});
```

### ❌ MongoDB Connection Failed

**Solusi:**

- Verify connection string format
- Check IP whitelist di MongoDB Atlas
- Ensure cluster is running

### ❌ Build Fails

**Solusi:**

- Check build logs di Vercel
- Run `npm run build` locally untuk debug
- Verify all dependencies installed

## 📊 Performance Optimization

1. **Enable Image Optimization** (Next.js built-in)
2. **Create MongoDB Indexes**:

```javascript
db.links.createIndex({ shortCode: 1 });
db.links.createIndex({ userId: 1 });
db.links.createIndex({ createdAt: 1 });
```

3. **Add caching headers** (vercel.json)

## 🔄 Continuous Deployment

Vercel automatically deploys on:

- Push to main branch
- Pull request created (preview deployment)

To disable auto-deploy:

- Project Settings → Git → Deployment trigger

## 📞 Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Next.js Docs**: https://nextjs.org/docs
- **NestJS Docs**: https://docs.nestjs.com

---

## ✅ Deployment Checklist

- [ ] Repository di GitHub public atau private
- [ ] MongoDB Atlas cluster created dan running
- [ ] JWT_SECRET generated
- [ ] Backend deployed ke Vercel
- [ ] Frontend deployed dengan correct API URL
- [ ] Environment variables semua set
- [ ] CORS configuration correct
- [ ] Database backups configured
- [ ] Domain custom (optional)
- [ ] Monitoring setup (optional)

**Selamat! Aplikasi Anda sudah live di Vercel! 🎉**

---

_Last updated: 2025-12-05_
