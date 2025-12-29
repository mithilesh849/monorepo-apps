# Complete Vercel Setup Guide

This comprehensive guide walks you through setting up all applications (API, Web1, Web2) in Vercel with proper configuration for Develop, Staging, and Production environments.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Create Vercel Projects](#step-1-create-vercel-projects)
3. [Step 2: Configure API Project](#step-2-configure-api-project)
4. [Step 3: Configure Web1 Project](#step-3-configure-web1-project)
5. [Step 4: Configure Web2 Project](#step-4-configure-web2-project)
6. [Step 5: Environment Variables Setup](#step-5-environment-variables-setup)
7. [Step 6: Database Configuration](#step-6-database-configuration)
8. [Step 7: Domain Configuration](#step-7-domain-configuration)
9. [Step 8: GitHub Integration](#step-8-github-integration)
10. [Step 9: Branch-Based Deployments](#step-9-branch-based-deployments)
11. [Step 10: Verify Deployments](#step-10-verify-deployments)
12. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:

- ✅ Vercel account (sign up at [vercel.com](https://vercel.com))
- ✅ GitHub repository connected to Vercel
- ✅ Supabase project with database credentials
- ✅ All three branches: `main`, `staging`, `develop`

---

## Step 1: Create Vercel Projects

### 1.1 Import API Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure the API project:

   **Project Name:** `ms-monorepo-api` (or your preferred name)

   **Framework Preset:** Other

   **Root Directory:** `apps/api`

   **Build Command:** `cd ../.. && npm install && cd apps/api && npm run build`

   **Output Directory:** Leave empty (Vercel will use vercel.json)

   **Install Command:** `cd ../.. && npm install`

5. Click **Deploy**

### 1.2 Import Web1 Project

1. Click **Add New** → **Project** again
2. Import the same GitHub repository
3. Configure Web1 project:

   **Project Name:** `ms-monorepo-web1`

   **Framework Preset:** Next.js

   **Root Directory:** `apps/web1`

   **Build Command:** `cd ../.. && npm install && cd apps/web1 && npm run build`

   **Output Directory:** `.next` (auto-detected by Next.js)

   **Install Command:** `cd ../.. && npm install`

4. Click **Deploy**

### 1.3 Import Web2 Project

1. Click **Add New** → **Project** again
2. Import the same GitHub repository
3. Configure Web2 project:

   **Project Name:** `ms-monorepo-web2`

   **Framework Preset:** Next.js

   **Root Directory:** `apps/web2`

   **Build Command:** `cd ../.. && npm install && cd apps/web2 && npm run build`

   **Output Directory:** `.next` (auto-detected by Next.js)

   **Install Command:** `cd ../.. && npm install`

4. Click **Deploy**

### 1.4 Note Project IDs

After creating each project, note the **Project ID** from:
- Project Settings → General → Project ID

You'll need these for GitHub Actions secrets:
- `VERCEL_PROJECT_ID_API`
- `VERCEL_PROJECT_ID_WEB1`
- `VERCEL_PROJECT_ID_WEB2`

---

## Step 2: Configure API Project

### 2.1 Project Settings

1. Go to API project → **Settings**

2. **General Settings:**
   - **Node.js Version:** 20.x (or latest LTS)
   - **Install Command:** `cd ../.. && npm install`
   - **Build Command:** `cd ../.. && npm install && npm run build --filter=api`
   - **Output Directory:** Leave empty

3. **Environment Variables** (see Step 5 for details)

### 2.2 Vercel Configuration

The `apps/api/vercel.json` is already configured. Verify it includes:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.ts"
    }
  ]
}
```

### 2.3 Build Settings

Ensure these are set in Vercel:
- **Node.js Version:** 20.x
- **Environment:** Node.js

---

## Step 3: Configure Web1 Project

### 3.1 Project Settings

1. Go to Web1 project → **Settings**

2. **General Settings:**
   - **Framework:** Next.js
   - **Node.js Version:** 20.x
   - **Install Command:** `cd ../.. && npm install`
   - **Build Command:** `cd ../.. && npm install && npm run build --filter=web1`
   - **Output Directory:** `.next`

3. **Environment Variables** (see Step 5 for details)

### 3.2 Next.js Configuration

The `apps/web1/next.config.js` should be configured. Vercel will auto-detect Next.js settings.

---

## Step 4: Configure Web2 Project

### 4.1 Project Settings

1. Go to Web2 project → **Settings**

2. **General Settings:**
   - **Framework:** Next.js
   - **Node.js Version:** 20.x
   - **Install Command:** `cd ../.. && npm install`
   - **Build Command:** `cd ../.. && npm install && npm run build --filter=web2`
   - **Output Directory:** `.next`

3. **Environment Variables** (see Step 5 for details)

---

## Step 5: Environment Variables Setup

### 5.1 API Project Environment Variables

Go to **API Project** → **Settings** → **Environment Variables**

#### Production Environment

Add these variables and select **Production**:

| Variable | Value | Description |
|----------|-------|-------------|
| `DATABASE_URL` | `postgresql://postgres:password@db.xxx.supabase.co:5432/postgres` | Supabase production database |
| `SUPABASE_URL` | `https://your-project.supabase.co` | Supabase project URL |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Supabase anon key |
| `PORT` | `3001` | Server port (optional, Vercel sets this) |
| `WEB1_URL` | `https://ms-monorepo-web1.vercel.app` | Web1 production URL |
| `WEB2_URL` | `https://ms-monorepo-web2.vercel.app` | Web2 production URL |

#### Preview Environment (Staging/Develop)

Add the same variables but select **Preview**:

| Variable | Value | Description |
|----------|-------|-------------|
| `DATABASE_URL` | `postgresql://postgres:password@db.xxx.supabase.co:5432/postgres` | Supabase database (can be same or separate) |
| `SUPABASE_URL` | `https://your-project.supabase.co` | Supabase project URL |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Supabase anon key |
| `WEB1_URL` | `https://ms-monorepo-web1-git-staging-xxx.vercel.app` | Web1 preview URL (or staging domain) |
| `WEB2_URL` | `https://ms-monorepo-web2-git-staging-xxx.vercel.app` | Web2 preview URL (or staging domain) |

**Note:** Preview URLs are auto-generated. You can find them after first deployment.

### 5.2 Web1 Project Environment Variables

Go to **Web1 Project** → **Settings** → **Environment Variables**

#### Production Environment

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://ms-monorepo-api.vercel.app` | API production URL |

#### Preview Environment

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://ms-monorepo-api-git-staging-xxx.vercel.app` | API preview/staging URL |

### 5.3 Web2 Project Environment Variables

Go to **Web2 Project** → **Settings** → **Environment Variables**

#### Production Environment

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://ms-monorepo-api.vercel.app` | API production URL |

#### Preview Environment

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://ms-monorepo-api-git-staging-xxx.vercel.app` | API preview/staging URL |

### 5.4 How to Add Environment Variables

1. Go to Project → **Settings** → **Environment Variables**
2. Click **Add New**
3. Enter **Name** and **Value**
4. Select environments:
   - ✅ **Production** - for `main` branch
   - ✅ **Preview** - for `staging` and `develop` branches
   - ✅ **Development** - for local development (optional)
5. Click **Save**
6. **Redeploy** the project for changes to take effect

---

## Step 6: Database Configuration

### 6.1 Supabase Setup

1. **Create Supabase Project** (if not done):
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note database credentials

2. **Get Connection String:**
   - Supabase Dashboard → **Settings** → **Database**
   - Copy **Connection string** (URI format)
   - Format: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

3. **Database Options:**

   **Option A: Single Database (Recommended for Start)**
   - Use same database for all environments
   - Simpler setup
   - Use different schemas or tables if needed

   **Option B: Separate Databases**
   - Create separate Supabase projects for Production, Staging, Develop
   - More isolated but requires more management

### 6.2 Run Migrations

Before first deployment, run Prisma migrations:

**Option 1: Local Migration (Recommended)**
```bash
cd apps/api
npm run prisma:generate
npm run prisma:migrate
```

**Option 2: Vercel Build Command**
Add to build command:
```bash
cd ../.. && npm install && cd apps/api && npm run prisma:generate && npm run build
```

### 6.3 Seed Database

Seed production database (optional):
```bash
# Connect to production database
DATABASE_URL="your-production-url" npm run prisma:seed
```

---

## Step 7: Domain Configuration

### 7.1 Add Custom Domains (Optional)

1. Go to Project → **Settings** → **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `api.yourdomain.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (can take up to 24 hours)

### 7.2 Recommended Domain Structure

**Production:**
- API: `api.yourdomain.com` or `api-prod.yourdomain.com`
- Web1: `web1.yourdomain.com` or `app1.yourdomain.com`
- Web2: `web2.yourdomain.com` or `app2.yourdomain.com`

**Staging:**
- API: `api-staging.yourdomain.com`
- Web1: `web1-staging.yourdomain.com`
- Web2: `web2-staging.yourdomain.com`

**Develop:**
- API: `api-develop.yourdomain.com`
- Web1: `web1-develop.yourdomain.com`
- Web2: `web2-develop.yourdomain.com`

### 7.3 Update Environment Variables

After adding custom domains, update environment variables:
- Update `WEB1_URL` and `WEB2_URL` in API project
- Update `NEXT_PUBLIC_API_URL` in Web1 and Web2 projects

---

## Step 8: GitHub Integration

### 8.1 Connect GitHub Repository

1. Vercel automatically connects when you import from GitHub
2. Verify connection: Project → **Settings** → **Git**
3. Ensure correct repository is connected

### 8.2 Configure GitHub Secrets

For GitHub Actions workflows, add these secrets:

Go to GitHub Repository → **Settings** → **Secrets and variables** → **Actions**

| Secret Name | How to Get |
|-------------|------------|
| `VERCEL_TOKEN` | Vercel Dashboard → Settings → Tokens → Create Token |
| `VERCEL_ORG_ID` | Vercel Dashboard → Settings → General → Team ID or Personal Account ID |
| `VERCEL_PROJECT_ID_API` | API Project → Settings → General → Project ID |
| `VERCEL_PROJECT_ID_WEB1` | Web1 Project → Settings → General → Project ID |
| `VERCEL_PROJECT_ID_WEB2` | Web2 Project → Settings → General → Project ID |

**How to get VERCEL_TOKEN:**
1. Vercel Dashboard → **Settings** → **Tokens**
2. Click **Create Token**
3. Name it (e.g., "GitHub Actions")
4. Copy the token (only shown once!)
5. Add to GitHub Secrets

**How to get VERCEL_ORG_ID:**
1. Vercel Dashboard → **Settings** → **General**
2. Look for **Team ID** (for teams) or **Account ID** (for personal)
3. Copy the ID

---

## Step 9: Branch-Based Deployments

### 9.1 Configure Branch Deployments

Vercel automatically creates preview deployments for all branches. Configure which branches deploy to which environment:

1. Go to Project → **Settings** → **Git**
2. Configure **Production Branch:** `main`
3. **Preview Deployments:** Enabled (default)

### 9.2 Environment-Specific Deployments

**Production (main branch):**
- Automatically deploys to production
- Uses Production environment variables
- Gets production domain

**Staging (staging branch):**
- Creates preview deployment
- Uses Preview environment variables
- Gets preview URL (e.g., `project-git-staging-xxx.vercel.app`)

**Develop (develop branch):**
- Creates preview deployment
- Uses Preview environment variables
- Gets preview URL (e.g., `project-git-develop-xxx.vercel.app`)

### 9.3 GitHub Actions Integration

The workflows are already configured:
- `deploy-production.yml` - Deploys on `main` branch
- `deploy-staging.yml` - Deploys on `staging` branch
- `deploy-develop.yml` - Deploys on `develop` branch

These workflows use Vercel CLI to deploy. Ensure GitHub secrets are configured (Step 8.2).

---

## Step 10: Verify Deployments

### 10.1 Test Production Deployment

1. **Deploy to Production:**
   ```bash
   git checkout main
   git push origin main
   ```

2. **Check Deployments:**
   - Go to Vercel Dashboard
   - Check each project's **Deployments** tab
   - Verify all three projects deployed successfully

3. **Test API:**
   ```bash
   curl https://ms-monorepo-api.vercel.app/health
   curl https://ms-monorepo-api.vercel.app/api/products
   ```

4. **Test Web Apps:**
   - Visit Web1: `https://ms-monorepo-web1.vercel.app`
   - Visit Web2: `https://ms-monorepo-web2.vercel.app`
   - Check products page loads correctly

### 10.2 Test Staging Deployment

1. **Deploy to Staging:**
   ```bash
   git checkout staging
   git push origin staging
   ```

2. **Get Preview URLs:**
   - Check Vercel Dashboard → Deployments
   - Note the preview URLs for each project

3. **Update Environment Variables:**
   - Update `WEB1_URL` and `WEB2_URL` in API project (Preview)
   - Update `NEXT_PUBLIC_API_URL` in Web1 and Web2 (Preview)
   - Use the preview URLs from step 2

4. **Redeploy:**
   - Trigger redeploy or push another commit

### 10.3 Test Develop Deployment

1. **Deploy to Develop:**
   ```bash
   git checkout develop
   git push origin develop
   ```

2. Follow same steps as Staging (Step 10.2)

### 10.4 Verify CORS

Test that Web1 and Web2 can access the API:

1. Open browser console on Web1/Web2
2. Check for CORS errors
3. Verify products load correctly
4. If CORS errors, verify `WEB1_URL` and `WEB2_URL` in API environment variables

---

## Troubleshooting

### Build Failures

**Issue: "Cannot find module"**
- **Solution:** Ensure `Install Command` includes `cd ../.. && npm install`
- Check that all dependencies are in root `package.json`

**Issue: "Prisma Client not generated"**
- **Solution:** Add `npm run prisma:generate` to build command
- Or run migrations locally before deploying

**Issue: "Build command failed"**
- **Solution:** Check build logs in Vercel
- Verify Node.js version is correct (20.x)
- Ensure all scripts are defined in package.json

### Environment Variables Not Working

**Issue: Variables not available at runtime**
- **Solution:** 
  - Verify variables are set for correct environment (Production/Preview)
  - Redeploy after adding variables
  - Check variable names match exactly (case-sensitive)

**Issue: Next.js can't access variables**
- **Solution:** 
  - Ensure client-side variables start with `NEXT_PUBLIC_`
  - Restart dev server or redeploy

### Database Connection Issues

**Issue: "Can't connect to database"**
- **Solution:**
  - Verify `DATABASE_URL` is correct
  - Check Supabase project is active
  - Ensure database password doesn't need URL encoding
  - Check Supabase IP allowlist (if enabled)

**Issue: "Migration failed"**
- **Solution:**
  - Run migrations locally first
  - Check Prisma schema is correct
  - Verify database permissions

### CORS Errors

**Issue: "CORS policy blocked"**
- **Solution:**
  - Verify `WEB1_URL` and `WEB2_URL` in API environment variables
  - Check URLs match exactly (no trailing slashes)
  - Ensure variables are set for correct environment
  - Redeploy API after updating CORS variables

### Deployment Not Triggering

**Issue: GitHub Actions not deploying**
- **Solution:**
  - Check GitHub secrets are configured
  - Verify workflow files are in `.github/workflows/`
  - Check Actions tab for errors
  - Verify branch names match workflow triggers

---

## Quick Reference Checklist

### Initial Setup
- [ ] Create 3 Vercel projects (API, Web1, Web2)
- [ ] Configure build settings for each project
- [ ] Note all Project IDs
- [ ] Get Vercel Token and Org ID
- [ ] Add GitHub Secrets

### Environment Variables
- [ ] Set API Production variables
- [ ] Set API Preview variables
- [ ] Set Web1 Production variables
- [ ] Set Web1 Preview variables
- [ ] Set Web2 Production variables
- [ ] Set Web2 Preview variables

### Database
- [ ] Create Supabase project
- [ ] Get database connection string
- [ ] Run Prisma migrations
- [ ] Seed database (optional)

### Deployment
- [ ] Deploy to Production (main branch)
- [ ] Deploy to Staging (staging branch)
- [ ] Deploy to Develop (develop branch)
- [ ] Verify all deployments work
- [ ] Test API endpoints
- [ ] Test Web apps
- [ ] Verify CORS works

### Optional
- [ ] Add custom domains
- [ ] Configure DNS
- [ ] Set up monitoring
- [ ] Configure alerts

---

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
- [Supabase Documentation](https://supabase.com/docs)

---

## Next Steps

After completing setup:

1. **Monitor Deployments:** Set up Vercel notifications
2. **Set Up Monitoring:** Add error tracking (Sentry, etc.)
3. **Performance:** Enable Vercel Analytics
4. **Security:** Review environment variables regularly
5. **Backup:** Set up database backups in Supabase

---

**Last Updated:** December 2024

