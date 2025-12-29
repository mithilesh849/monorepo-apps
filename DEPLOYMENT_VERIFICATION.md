# Deployment Verification Guide

This guide helps you verify that your GitHub Actions workflows are correctly configured and deployments are working.

## Pre-Deployment Checklist

### ✅ GitHub Secrets Verification

Verify all required secrets are set in GitHub:

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Verify these secrets exist:
   - ✅ `VERCEL_TOKEN`
   - ✅ `VERCEL_ORG_ID`
   - ✅ `VERCEL_PROJECT_ID_API`
   - ✅ `VERCEL_PROJECT_ID_WEB1`
   - ✅ `VERCEL_PROJECT_ID_WEB2`

### ✅ Vercel Environment Variables

Verify environment variables are set in Vercel for each project:

**API Project:**
- Production: `DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `WEB1_URL`, `WEB2_URL`
- Preview: Same variables with preview URLs

**Web1 Project:**
- Production: `NEXT_PUBLIC_API_URL`
- Preview: `NEXT_PUBLIC_API_URL` (with preview API URL)

**Web2 Project:**
- Production: `NEXT_PUBLIC_API_URL`
- Preview: `NEXT_PUBLIC_API_URL` (with preview API URL)

## Testing Workflows

### 1. Test CI Workflow

The CI workflow runs on every push and PR. Test it:

```bash
# Make a small change and push
git checkout -b test-ci
echo "# Test" >> README.md
git add README.md
git commit -m "test: CI workflow"
git push origin test-ci
```

**Expected Result:**
- Go to GitHub → **Actions** tab
- You should see "CI" workflow running
- It should complete successfully with:
  - ✅ Build and Test job passes
  - ✅ Linter passes
  - ✅ All apps build successfully

### 2. Test Develop Deployment

```bash
# Switch to develop branch
git checkout develop

# Make a test change
echo "// Test" >> apps/api/src/index.ts
git add .
git commit -m "test: develop deployment"
git push origin develop
```

**Expected Result:**
- Go to GitHub → **Actions** tab
- "Deploy to Develop" workflow should trigger
- All three jobs should complete:
  - ✅ Deploy API to Develop
  - ✅ Deploy Web1 to Develop
  - ✅ Deploy Web2 to Develop
- Check Vercel Dashboard for new preview deployments

### 3. Test Staging Deployment

```bash
# Switch to staging branch
git checkout staging

# Make a test change
echo "// Test staging" >> apps/api/src/index.ts
git add .
git commit -m "test: staging deployment"
git push origin staging
```

**Expected Result:**
- "Deploy to Staging" workflow should trigger
- All three deployments should succeed
- Check Vercel Dashboard for preview deployments

### 4. Test Production Deployment

**⚠️ Only test this if you're ready for production!**

```bash
# Switch to main branch
git checkout main

# Merge your changes (or make a small test change)
# Make sure everything is tested first!

git push origin main
```

**Expected Result:**
- "Deploy to Production" workflow should trigger
- All three deployments should succeed
- Check Vercel Dashboard for production deployments

## Manual Workflow Trigger

You can also trigger workflows manually:

1. Go to GitHub → **Actions** tab
2. Select the workflow (e.g., "Deploy to Production")
3. Click **Run workflow**
4. Select the branch
5. Click **Run workflow**

## Verification Steps

### After Each Deployment

1. **Check GitHub Actions:**
   - Go to **Actions** tab
   - Verify workflow completed successfully (green checkmark)
   - Check logs for any warnings or errors

2. **Check Vercel Dashboard:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Check each project's **Deployments** tab
   - Verify new deployment appears
   - Check deployment status (should be "Ready")

3. **Test API Endpoints:**
   ```bash
   # Replace with your actual URLs
   curl https://your-api-url.vercel.app/health
   curl https://your-api-url.vercel.app/api/products?appType=1
   curl https://your-api-url.vercel.app/api/products?appType=2
   ```

4. **Test Web Apps:**
   - Visit Web1 URL
   - Visit Web2 URL
   - Check products page loads
   - Verify products are filtered correctly (Web1 shows appType=1, Web2 shows appType=2)

5. **Check CORS:**
   - Open browser console on Web1/Web2
   - Check for CORS errors
   - Verify API calls succeed

## Common Issues and Solutions

### Issue: Workflow Fails at "Install dependencies"

**Error:** `npm ERR! code ERESOLVE` or dependency errors

**Solution:**
- Check that root `package.json` has all dependencies
- Verify `package-lock.json` is committed
- Try running `npm ci` locally to verify

### Issue: Build Fails

**Error:** `Cannot find module` or build errors

**Solution:**
- Verify build commands are correct in workflows
- Check that all apps have proper `package.json` files
- Verify TypeScript compilation works locally

### Issue: Vercel Deployment Fails

**Error:** Authentication or project ID errors

**Solution:**
- Verify `VERCEL_TOKEN` is valid (not expired)
- Check `VERCEL_ORG_ID` matches your Vercel account
- Verify `VERCEL_PROJECT_ID_*` match actual project IDs

### Issue: Environment Variables Not Found

**Error:** `process.env.VARIABLE is undefined`

**Solution:**
- Check Vercel project settings → Environment Variables
- Verify variables are set for correct environment (Production/Preview)
- Redeploy after adding variables

### Issue: CORS Errors

**Error:** `CORS policy blocked`

**Solution:**
- Verify `WEB1_URL` and `WEB2_URL` in API environment variables
- Check URLs match actual deployment URLs
- Ensure no trailing slashes in URLs
- Redeploy API after updating CORS variables

## Workflow Status Monitoring

### GitHub Actions Status Badge

Add to your README.md:

```markdown
![CI](https://github.com/your-username/your-repo/workflows/CI/badge.svg)
![Deploy Production](https://github.com/your-username/your-repo/workflows/Deploy%20to%20Production/badge.svg)
```

### Vercel Status

- Monitor deployments in Vercel Dashboard
- Set up deployment notifications
- Check function logs for API errors

## Success Criteria

Your deployment is working correctly if:

- ✅ CI workflow passes on all pushes/PRs
- ✅ Develop deployments succeed when pushing to `develop`
- ✅ Staging deployments succeed when pushing to `staging`
- ✅ Production deployments succeed when pushing to `main`
- ✅ All three apps (API, Web1, Web2) deploy successfully
- ✅ API endpoints respond correctly
- ✅ Web apps load and display products
- ✅ Products are filtered by appType correctly
- ✅ No CORS errors in browser console
- ✅ Environment variables are loaded correctly

## Next Steps

After verifying deployments work:

1. **Set up monitoring:** Add error tracking (Sentry, etc.)
2. **Set up alerts:** Configure notifications for failed deployments
3. **Document URLs:** Keep track of deployment URLs for each environment
4. **Test regularly:** Run test deployments before major releases
5. **Review logs:** Periodically check deployment logs for issues

## Quick Test Commands

```bash
# Test local build (should work before deploying)
npm ci
npm run build

# Test API locally
cd apps/api
npm run dev
curl http://localhost:3001/api/products?appType=1

# Test Web1 locally
cd apps/web1
npm run dev
# Visit http://localhost:3002/products

# Test Web2 locally
cd apps/web2
npm run dev
# Visit http://localhost:3003/products
```

---

**Last Updated:** December 2024

