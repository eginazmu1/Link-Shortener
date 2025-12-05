# ✅ Vercel Deployment Checklist

## 🌐 Domains

- **Backend**: https://link-shortenerfix.vercel.app
- **Frontend**: https://link-shortener-jm7t.vercel.app

## 🔧 Backend Environment Variables (Vercel Settings)

Buka: https://vercel.com/link-shortenerfix/settings/environment-variables

Set variables berikut:

```
MONGODB_URI = mongodb+srv://eginazmumuqtapi98_db_user:ZIP3e5hXkuksohHL@linkshortener.b8mie2f.mongodb.net/?appName=LinkShortener
JWT_SECRET = [your-secret-key]
FRONTEND_URL = https://link-shortener-jm7t.vercel.app
NODE_ENV = production
```

## 🎨 Frontend Environment Variables (Vercel Settings)

Buka: https://vercel.com/link-shortener-jm7t/settings/environment-variables

Set variables:

```
NEXT_PUBLIC_API_URL = https://link-shortenerfix.vercel.app
```

## ✨ Redirect Flow

1. User access: `https://link-shortener-jm7t.vercel.app/abc123`
2. Frontend middleware intercept
3. Call: `/api/redirect/abc123` (frontend API route)
4. Frontend API call: `https://link-shortenerfix.vercel.app/redirect/abc123`
5. Backend return original URL
6. Browser redirect 301 → Original URL

## 🧪 Testing

### Test Login

```
URL: https://link-shortener-jm7t.vercel.app/auth/login
Email: your@email.com
Password: your-password
```

### Test Create Link

1. Login to dashboard
2. Paste long URL
3. Click "Shorten"
4. Copy short link

### Test Redirect

```
URL: https://link-shortener-jm7t.vercel.app/[shortCode]
Expected: Redirect ke original URL
```

## 🐛 If Something Goes Wrong

### Error: "Failed to load resource"

**Fix**: Check `NEXT_PUBLIC_API_URL` in frontend env vars

### Error: "Registration failed"

**Fix**: Check `FRONTEND_URL` in backend env vars (must match frontend domain)

### Error: "Connection refused"

**Fix**: Verify MongoDB connection string is correct

### Redirect 404

**Fix**: Check middleware.ts exists in frontend

## 📝 Quick Reference

| Item                 | Value                                  |
| -------------------- | -------------------------------------- |
| Backend Domain       | https://link-shortenerfix.vercel.app   |
| Frontend Domain      | https://link-shortener-jm7t.vercel.app |
| API Base URL         | https://link-shortenerfix.vercel.app   |
| Frontend Base URL    | https://link-shortener-jm7t.vercel.app |
| Login Endpoint       | `${NEXT_PUBLIC_API_URL}/auth/login`    |
| Create Link Endpoint | `${NEXT_PUBLIC_API_URL}/links`         |
| Redirect Endpoint    | `/api/redirect/:shortCode`             |

---

**Status: ✅ Production Ready**
