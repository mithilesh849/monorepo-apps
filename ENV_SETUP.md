# Environment Variables Setup Guide

This guide explains how to configure environment variables for local development and Vercel deployment.

## Local Development

### API (`apps/api/.env`)

Create or update `apps/api/.env` with the following variables:

```env
# Database - Replace with your Supabase connection string
DATABASE_URL="postgresql://postgres:your-password@db.xxxxx.supabase.co:5432/postgres"

# Supabase (optional - for additional features)
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-anon-key-here"

# Server
PORT=3001

# Web App URLs (for CORS)
WEB1_URL=http://localhost:3002
WEB2_URL=http://localhost:3003
```

**How to get these values:**
- `DATABASE_URL`: Supabase Dashboard → Settings → Database → Connection string (URI)
- `SUPABASE_URL`: Supabase Dashboard → Settings → API → Project URL
- `SUPABASE_ANON_KEY`: Supabase Dashboard → Settings → API → anon public key

### Web App 1 (`apps/web1/.env`)

Create or update `apps/web1/.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Web App 2 (`apps/web2/.env`)

Create or update `apps/web2/.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Vercel Environment Variables

For production, staging, and develop environments, configure these in Vercel:

### API Project Environment Variables

Go to your API project in Vercel → Settings → Environment Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Supabase PostgreSQL connection string | `postgresql://postgres:pass@db.xxx.supabase.co:5432/postgres` |
| `SUPABASE_URL` | Supabase project URL | `https://your-project.supabase.co` |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `PORT` | Server port (optional, Vercel sets this) | `3001` |
| `WEB1_URL` | Web1 production URL | `https://web1.vercel.app` |
| `WEB2_URL` | Web2 production URL | `https://web2.vercel.app` |

**Environment-specific values:**
- Set different `WEB1_URL` and `WEB2_URL` for each environment (Production, Preview, Development)
- Use the same `DATABASE_URL` for all environments, or separate databases per environment

### Web1 Project Environment Variables

Go to your Web1 project in Vercel → Settings → Environment Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | API URL for this environment | Production: `https://api.vercel.app`<br>Staging: `https://api-staging.vercel.app`<br>Develop: `https://api-develop.vercel.app` |

### Web2 Project Environment Variables

Go to your Web2 project in Vercel → Settings → Environment Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | API URL for this environment | Production: `https://api.vercel.app`<br>Staging: `https://api-staging.vercel.app`<br>Develop: `https://api-develop.vercel.app` |

## Setting Up Vercel Environment Variables

### Step 1: Add Environment Variables

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Click **Add New**
4. Enter the variable name and value
5. Select which environments to apply to:
   - ✅ Production
   - ✅ Preview (for staging/develop branches)
   - ✅ Development

### Step 2: Environment-Specific Configuration

For different environments, you can:

**Option 1: Same variable, different values per environment**
- Add the same variable name multiple times
- Select different environments for each
- Use different values (e.g., different API URLs)

**Option 2: Use Vercel's environment detection**
- Set `NEXT_PUBLIC_API_URL` once per environment
- Vercel automatically uses the correct value based on the deployment environment

### Step 3: Redeploy

After adding environment variables:
1. Variables are automatically available on next deployment
2. Or trigger a redeploy: **Deployments** → Select deployment → **Redeploy**

## Quick Setup Commands

### Copy example files (if needed)

```bash
# API
cp apps/api/.env.example apps/api/.env

# Web1
cp apps/web1/.env.example apps/web1/.env

# Web2
cp apps/web2/.env.example apps/web2/.env
```

### Verify environment variables are loaded

```bash
# API
cd apps/api
node -e "require('dotenv').config(); console.log(process.env.DATABASE_URL)"

# Web1 (Next.js automatically loads .env)
cd apps/web1
npm run dev
# Check browser console or network tab for API calls
```

## Security Notes

✅ **DO:**
- Keep `.env` files in `.gitignore` (already configured)
- Use Vercel's environment variables for production secrets
- Use different database credentials per environment if needed
- Rotate keys regularly

❌ **DON'T:**
- Commit `.env` files to git
- Share `.env` files publicly
- Use production credentials in local development
- Hardcode secrets in source code

## Troubleshooting

### Variables not loading in Next.js
- Ensure variable names start with `NEXT_PUBLIC_` for client-side access
- Restart the dev server after adding new variables
- Check that `.env` file is in the correct location (`apps/web1/.env`)

### API can't connect to database
- Verify `DATABASE_URL` format is correct
- Check Supabase project is active
- Ensure database password is correct (no special characters need URL encoding)

### CORS errors
- Verify `WEB1_URL` and `WEB2_URL` in API `.env` match actual URLs
- Check Vercel environment variables are set correctly
- Ensure URLs don't have trailing slashes

## Example: Multi-Environment Setup

### Production
```env
# API
DATABASE_URL="postgresql://postgres:prod-pass@db.xxx.supabase.co:5432/postgres"
WEB1_URL="https://web1-prod.vercel.app"
WEB2_URL="https://web2-prod.vercel.app"

# Web1
NEXT_PUBLIC_API_URL="https://api-prod.vercel.app"

# Web2
NEXT_PUBLIC_API_URL="https://api-prod.vercel.app"
```

### Staging
```env
# API
DATABASE_URL="postgresql://postgres:staging-pass@db.xxx.supabase.co:5432/postgres"
WEB1_URL="https://web1-staging.vercel.app"
WEB2_URL="https://web2-staging.vercel.app"

# Web1
NEXT_PUBLIC_API_URL="https://api-staging.vercel.app"

# Web2
NEXT_PUBLIC_API_URL="https://api-staging.vercel.app"
```

### Develop
```env
# API
DATABASE_URL="postgresql://postgres:dev-pass@db.xxx.supabase.co:5432/postgres"
WEB1_URL="https://web1-develop.vercel.app"
WEB2_URL="https://web2-develop.vercel.app"

# Web1
NEXT_PUBLIC_API_URL="https://api-develop.vercel.app"

# Web2
NEXT_PUBLIC_API_URL="https://api-develop.vercel.app"
```

