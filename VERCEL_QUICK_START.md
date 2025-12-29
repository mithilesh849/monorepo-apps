# Vercel Quick Start Checklist

A quick reference for setting up Vercel deployments.

## 🚀 Quick Setup (30 minutes)

### 1. Create Vercel Projects (10 min)

**API Project:**
- Import repo → Name: `ms-monorepo-api`
- Root: `apps/api`
- Framework: Other
- Build: `cd ../.. && npm install && cd apps/api && npm run build`

**Web1 Project:**
- Import repo → Name: `ms-monorepo-web1`
- Root: `apps/web1`
- Framework: Next.js
- Build: `cd ../.. && npm install && cd apps/web1 && npm run build`

**Web2 Project:**
- Import repo → Name: `ms-monorepo-web2`
- Root: `apps/web2`
- Framework: Next.js
- Build: `cd ../.. && npm install && cd apps/web2 && npm run build`

### 2. Get Required IDs (5 min)

From each project's Settings → General:
- ✅ API Project ID → `VERCEL_PROJECT_ID_API`
- ✅ Web1 Project ID → `VERCEL_PROJECT_ID_WEB1`
- ✅ Web2 Project ID → `VERCEL_PROJECT_ID_WEB2`

From Vercel Settings → General:
- ✅ Org/Team ID → `VERCEL_ORG_ID`

From Vercel Settings → Tokens:
- ✅ Create token → `VERCEL_TOKEN`

### 3. Add GitHub Secrets (5 min)

GitHub Repo → Settings → Secrets → Actions:

```
VERCEL_TOKEN=your-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID_API=prj_xxxxx
VERCEL_PROJECT_ID_WEB1=prj_xxxxx
VERCEL_PROJECT_ID_WEB2=prj_xxxxx
```

### 4. Configure Environment Variables (10 min)

#### API Project → Environment Variables

**Production:**
```
DATABASE_URL=postgresql://...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
WEB1_URL=https://ms-monorepo-web1.vercel.app
WEB2_URL=https://ms-monorepo-web2.vercel.app
```

**Preview:**
```
DATABASE_URL=postgresql://...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
WEB1_URL=https://ms-monorepo-web1-git-staging-xxx.vercel.app
WEB2_URL=https://ms-monorepo-web2-git-staging-xxx.vercel.app
```

#### Web1 Project → Environment Variables

**Production:**
```
NEXT_PUBLIC_API_URL=https://ms-monorepo-api.vercel.app
```

**Preview:**
```
NEXT_PUBLIC_API_URL=https://ms-monorepo-api-git-staging-xxx.vercel.app
```

#### Web2 Project → Environment Variables

**Production:**
```
NEXT_PUBLIC_API_URL=https://ms-monorepo-api.vercel.app
```

**Preview:**
```
NEXT_PUBLIC_API_URL=https://ms-monorepo-api-git-staging-xxx.vercel.app
```

## 📋 Environment Variables Reference

### API Project

| Variable | Production | Preview |
|----------|-----------|---------|
| `DATABASE_URL` | Supabase prod DB | Supabase DB (same or separate) |
| `SUPABASE_URL` | Supabase URL | Supabase URL |
| `SUPABASE_ANON_KEY` | Supabase key | Supabase key |
| `WEB1_URL` | Web1 prod URL | Web1 preview URL |
| `WEB2_URL` | Web2 prod URL | Web2 preview URL |

### Web1 & Web2 Projects

| Variable | Production | Preview |
|----------|-----------|---------|
| `NEXT_PUBLIC_API_URL` | API prod URL | API preview URL |

## 🔗 URL Structure

After first deployment, you'll get:

**Production (main branch):**
- API: `https://ms-monorepo-api.vercel.app`
- Web1: `https://ms-monorepo-web1.vercel.app`
- Web2: `https://ms-monorepo-web2.vercel.app`

**Preview (staging/develop branches):**
- API: `https://ms-monorepo-api-git-staging-xxx.vercel.app`
- Web1: `https://ms-monorepo-web1-git-staging-xxx.vercel.app`
- Web2: `https://ms-monorepo-web2-git-staging-xxx.vercel.app`

## ✅ Verification Steps

1. **Deploy to Production:**
   ```bash
   git checkout main
   git push origin main
   ```

2. **Check Deployments:**
   - Vercel Dashboard → Check all 3 projects deployed
   - Note the preview URLs for staging/develop

3. **Test API:**
   ```bash
   curl https://ms-monorepo-api.vercel.app/health
   curl https://ms-monorepo-api.vercel.app/api/products
   ```

4. **Test Web Apps:**
   - Visit Web1 and Web2 URLs
   - Check products page loads
   - Verify no CORS errors

5. **Update Preview URLs:**
   - Copy preview URLs from deployments
   - Update `WEB1_URL` and `WEB2_URL` in API (Preview)
   - Update `NEXT_PUBLIC_API_URL` in Web1/Web2 (Preview)
   - Redeploy

## 🐛 Common Issues

**Build fails:**
- Check Node.js version is 20.x
- Verify build commands include `cd ../.. && npm install`
- Check all dependencies in root package.json

**CORS errors:**
- Verify `WEB1_URL` and `WEB2_URL` match actual URLs
- No trailing slashes in URLs
- Redeploy after updating variables

**Environment variables not working:**
- Ensure correct environment selected (Production/Preview)
- Redeploy after adding variables
- Check variable names are exact (case-sensitive)

## 📚 Full Documentation

See `VERCEL_SETUP_GUIDE.md` for complete detailed instructions.

