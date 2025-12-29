# Deployment Setup Guide

This guide explains how to set up GitHub Actions workflows for CI/CD with Vercel deployment.

## Prerequisites

1. Vercel account
2. GitHub repository with Actions enabled
3. Vercel projects created for each app (API, Web1, Web2)

## Required GitHub Secrets

Add the following secrets to your GitHub repository:
- Go to: `Settings` → `Secrets and variables` → `Actions` → `New repository secret`

### Required Secrets:

1. **VERCEL_TOKEN**
   - Get from: Vercel Dashboard → Settings → Tokens
   - Create a new token with full access

2. **VERCEL_ORG_ID**
   - Get from: Vercel Dashboard → Settings → General
   - Copy your Organization ID

3. **VERCEL_PROJECT_ID_API**
   - Get from: Vercel project settings for your API project
   - Found in: Project Settings → General

4. **VERCEL_PROJECT_ID_WEB1**
   - Get from: Vercel project settings for your Web1 project
   - Found in: Project Settings → General

5. **VERCEL_PROJECT_ID_WEB2**
   - Get from: Vercel project settings for your Web2 project
   - Found in: Project Settings → General

## Branch Strategy

- **develop** branch → Deploys to Develop environment
- **staging** branch → Deploys to Staging environment
- **main** branch → Deploys to Production environment

## Workflow Files

1. **ci.yml** - Runs on all pushes and PRs
   - Builds and tests all applications
   - Runs linter

2. **deploy-develop.yml** - Deploys to Develop
   - Triggers on push to `develop` branch
   - Can be manually triggered

3. **deploy-staging.yml** - Deploys to Staging
   - Triggers on push to `staging` branch
   - Can be manually triggered

4. **deploy-production.yml** - Deploys to Production
   - Triggers on push to `main` branch
   - Can be manually triggered

## Setting Up Vercel Projects

### For Next.js Apps (Web1, Web2):
1. Import your GitHub repository in Vercel
2. Select the app directory (e.g., `apps/web1`)
3. Configure build settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build` (or `cd apps/web1 && npm run build`)
   - Output Directory: `.next`
   - Install Command: `npm install`

### For API:
1. Import your GitHub repository in Vercel
2. Select the app directory: `apps/api`
3. Configure build settings:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## Manual Deployment

All deployment workflows can be triggered manually:
1. Go to GitHub Actions tab
2. Select the workflow (e.g., "Deploy to Production")
3. Click "Run workflow"
4. Select branch and click "Run workflow"

## Environment Variables

Set environment variables in Vercel for each project:
- Go to Project Settings → Environment Variables
- Add variables for each environment (Production, Preview, Development)

