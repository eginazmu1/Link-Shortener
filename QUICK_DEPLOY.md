# 🚀 Vercel Deployment - Quick Reference

## Setup Checklist

### 1️⃣ Persiapan Awal

- [ ] GitHub repository siap
- [ ] MongoDB Atlas account created
- [ ] JWT secret generated
- [ ] Environment variables ready

### 2️⃣ Deploy Backend

```
Project: link-shortener
Root Directory: backend
Build Command: npm run build
Output Directory: dist
```

**Environment Variables:**

```
MONGODB_URI = [YOUR_MONGODB_URI]
JWT_SECRET = [YOUR_JWT_SECRET]
FRONTEND_URL = [YOUR_FRONTEND_URL]
NODE_ENV = production
```

### 3️⃣ Deploy Frontend

```
Project: link-shortener (atau new project)
Root Directory: frontend
Build Command: npm run build
Output Directory: .next
```

**Environment Variables:**

```
NEXT_PUBLIC_API_URL = [YOUR_BACKEND_URL]
```

## Link Redirect Flow

```
User → Browser
   ↓
https://your-domain.vercel.app/abc123
   ↓
Frontend Middleware (middleware.ts)
   ↓
/api/redirect/abc123 (Next.js API Route)
   ↓
Backend GET /redirect/abc123
   ↓
MongoDB lookup
   ↓
Return originalUrl
   ↓
Browser Redirect 301 → Original URL
```

## API Endpoints

### Public (No Auth Required)

- `GET /redirect/:shortCode` - Redirect to original URL

### Protected (Require JWT Token)

- `POST /api/links` - Create new short link
- `GET /api/links` - Get user's links
- `GET /api/links/:id/analytics` - Link analytics
- `DELETE /api/links/:id` - Delete link

## Files Created for Deployment

```
├── vercel.json                    # Frontend config
├── backend/vercel.json            # Backend config
├── frontend/middleware.ts         # Redirect middleware
├── frontend/app/api/redirect/     # Redirect API route
├── DEPLOYMENT_SETUP.md            # Full guide
├── .env.example                   # Environment template
└── VERCEL_DEPLOYMENT_GUIDE.md     # Detailed steps
```

## Common Issues & Fixes

| Issue         | Fix                               |
| ------------- | --------------------------------- |
| CORS Error    | Check FRONTEND_URL in backend env |
| 404 Redirect  | Verify middleware.ts exists       |
| MongoDB Error | Check connection string           |
| Build Failed  | Run `npm run build` locally       |
| Token Invalid | Regenerate JWT_SECRET             |

## Vercel Commands

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# View logs
vercel logs [project-name]

# List projects
vercel projects list

# Check deployment
vercel list
```

## Testing URLs

```
Frontend: https://your-frontend.vercel.app
Backend: https://your-backend.vercel.app

Test redirect:
https://your-frontend.vercel.app/[shortCode]

Test API:
GET https://your-backend.vercel.app/redirect/[shortCode]
POST https://your-backend.vercel.app/api/links
```

## Environment Variable Generator

### JWT Secret (Run in PowerShell)

```powershell
[System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).ToString())) + (New-Guid).ToString()
```

### MongoDB Connection String

```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/link-shortener?retryWrites=true&w=majority
```

## Security Tips

1. **Never commit .env files**
2. **Use Vercel Environment Secrets** for sensitive data
3. **Enable MongoDB IP whitelist**
4. **Use HTTPS only** (Vercel default)
5. **Rotate JWT secrets** periodically
6. **Enable 2FA** on Vercel and MongoDB

## Performance Tips

1. Enable **Vercel Analytics**
2. Create **MongoDB indexes**
3. Use **CDN caching**
4. Monitor **database connections**
5. Set up **error tracking** (Sentry optional)

## Next Steps

- [ ] Deploy backend to Vercel
- [ ] Deploy frontend to Vercel
- [ ] Test link creation and redirect
- [ ] Setup custom domain (optional)
- [ ] Enable Analytics
- [ ] Setup error monitoring
- [ ] Configure backups

---

**Need help?** Check DEPLOYMENT_SETUP.md for detailed instructions.
