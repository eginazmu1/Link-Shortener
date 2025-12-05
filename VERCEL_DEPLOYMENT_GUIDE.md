# Vercel Deployment Guide - Link Shortener

Panduan lengkap untuk deploy Link Shortener App ke Vercel.

## 📋 Prerequisites

- Akun GitHub
- Akun Vercel (gratis di https://vercel.com)
- MongoDB Atlas account (untuk database)
- JWT secret key

## 🚀 Step 1: Persiapan Repository

1. **Push code ke GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/link-shortener.git
git push -u origin main
```

2. **Setup MongoDB Atlas**
   - Buka https://www.mongodb.com/cloud/atlas
   - Buat cluster baru
   - Dapatkan connection string: `mongodb+srv://username:password@cluster.mongodb.net/link-shortener`

## 🌐 Step 2: Deploy Backend ke Vercel

1. **Buka Vercel Dashboard**: https://vercel.com/dashboard
2. **Import Project**:
   - Klik "New Project"
   - Pilih repository GitHub Anda
3. **Configure Backend**:

   - Root Directory: `backend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Set Environment Variables**:
   Klik "Environment Variables" dan tambahkan:

   ```
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/link-shortener
   JWT_SECRET = your-random-secret-key
   FRONTEND_URL = https://your-frontend-domain.vercel.app
   NODE_ENV = production
   ```

5. **Deploy**
   - Klik Deploy
   - Tunggu hingga selesai
   - Catat domain backend (misal: `link-shortener-api.vercel.app`)

## 🎨 Step 3: Deploy Frontend ke Vercel

1. **Create New Project** di Vercel untuk frontend

   - Klik "New Project"
   - Pilih repository yang sama

2. **Configure Frontend**:

   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Set Environment Variables**:

   ```
   NEXT_PUBLIC_API_URL = https://link-shortener-api.vercel.app
   ```

4. **Deploy**
   - Klik Deploy
   - Catat domain frontend

## ⚙️ Step 4: Konfigurasi Produksi

### CORS Setup di Backend (`backend/src/main.ts`)

```typescript
app.enableCors({
  origin: ["https://your-frontend-domain.vercel.app", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
});
```

### Redirect Flow

1. User akses `https://your-frontend-domain.vercel.app/abc123`
2. Middleware di Next.js intercept request
3. Frontend route API `/api/redirect/abc123` dipanggil
4. Frontend API route memanggil backend `/api/redirect/abc123`
5. Backend return original URL
6. Browser redirect ke original URL

## 🔍 Troubleshooting

### CORS Errors

- Pastikan `NEXT_PUBLIC_API_URL` benar di frontend
- Pastikan backend CORS configuration include frontend domain

### Link Not Found

- Check MongoDB connection
- Pastikan link dengan short code tersebut ada di database

### 404 di redirect

- Pastikan middleware.ts ada di root frontend app
- Check route configuration di next.config.js

## 🧪 Testing

### Test di Local:

```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Akses http://localhost:3000

### Test di Production:

1. Buat short link di dashboard
2. Buka short link di browser baru
3. Verify redirect berfungsi

## 📝 Environment Variables Checklist

- [ ] MONGODB_URI dikonfigurasi di backend
- [ ] JWT_SECRET di-set di backend
- [ ] NEXT_PUBLIC_API_URL di-set di frontend
- [ ] FRONTEND_URL di-set di backend
- [ ] CORS origins include frontend domain

## 🎯 Tips Optimasi

1. **Performance**: Enable image optimization di Next.js
2. **Database**: Create indexes di MongoDB untuk short codes
3. **Security**:
   - Rotate JWT_SECRET regularly
   - Use strong MongoDB password
   - Enable 2FA di Vercel

## 📞 Support

Jika ada masalah:

1. Check Vercel logs: `vercel logs`
2. Check MongoDB connection string
3. Verify environment variables
4. Review CORS configuration

---

**Selamat! Aplikasi Anda sudah live di Vercel! 🎉**
