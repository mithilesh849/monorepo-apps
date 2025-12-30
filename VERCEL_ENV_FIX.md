# Quick Fix: API URL Environment Variable

## Problem
Error: `Failed to parse URL from monorepo-apps-api.vercel.app/api/products?appType=2`

This means the `NEXT_PUBLIC_API_URL` is missing the `https://` protocol.

## Solution

### Step 1: Find Your API URL
1. Go to your **API project** in Vercel Dashboard
2. Check the **Deployments** tab
3. Copy the production URL (should look like: `https://monorepo-apps-api.vercel.app`)

### Step 2: Fix Web1 Environment Variables
1. Go to **Web1 project** in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Find `NEXT_PUBLIC_API_URL`
4. **Update the value** to include `https://`:
   - ❌ Wrong: `monorepo-apps-api.vercel.app`
   - ✅ Correct: `https://monorepo-apps-api.vercel.app`
5. Make sure it's selected for **Production** environment
6. Click **Save**

### Step 3: Fix Web2 Environment Variables
1. Go to **Web2 project** in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Find `NEXT_PUBLIC_API_URL`
4. **Update the value** to include `https://`:
   - ❌ Wrong: `monorepo-apps-api.vercel.app`
   - ✅ Correct: `https://monorepo-apps-api.vercel.app`
5. Make sure it's selected for **Production** environment
6. Click **Save**

### Step 4: Redeploy
After updating the environment variables:
1. Go to **Deployments** tab in each project (Web1 and Web2)
2. Click the **three dots** (⋯) on the latest deployment
3. Select **Redeploy**
4. Or push a new commit to trigger a new deployment

## For Preview/Staging Environments
If you also have Preview/Staging deployments, update `NEXT_PUBLIC_API_URL` for those environments too:
- Use the preview API URL (usually looks like: `https://monorepo-apps-api-git-staging-xxx.vercel.app`)

## Verify
After redeploying, check:
1. Open your deployed Web1 or Web2 app
2. Navigate to the Products page
3. The error should be gone and products should load

## Quick Checklist
- [ ] Web1: `NEXT_PUBLIC_API_URL` = `https://monorepo-apps-api.vercel.app` (with https://)
- [ ] Web2: `NEXT_PUBLIC_API_URL` = `https://monorepo-apps-api.vercel.app` (with https://)
- [ ] Environment selected: **Production** (and Preview if needed)
- [ ] Redeployed both Web1 and Web2

