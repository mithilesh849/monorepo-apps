# MS Monorepo

A Turborepo-based monorepo containing multiple applications.

## Structure

- `apps/api` - API application
- `apps/web1` - First Next.js demo application
- `apps/web2` - Second Next.js demo application

## Getting Started

Install dependencies:

```bash
npm install
```

Run all applications in development mode:

```bash
npm run dev
```

Build all applications:

```bash
npm run build
```

## Applications

### API

The API application is located in `apps/api`.

### Web Applications

Two Next.js demo applications are located in:
- `apps/web1`
- `apps/web2`

## CI/CD

This project uses GitHub Actions for CI/CD with Vercel deployment.

### Environments

- **Develop** - Deploys from `develop` branch
- **Staging** - Deploys from `staging` branch
- **Production** - Deploys from `main` branch

### Workflows

- `ci.yml` - Runs build and lint on all pushes and PRs
- `deploy-develop.yml` - Deploys to develop environment
- `deploy-staging.yml` - Deploys to staging environment
- `deploy-production.yml` - Deploys to production environment

For detailed setup instructions, see:
- [Vercel Setup Guide](VERCEL_SETUP_GUIDE.md) - Complete Vercel configuration for all environments
- [Vercel Quick Start](VERCEL_QUICK_START.md) - Quick reference checklist
- [Deployment Setup](.github/DEPLOYMENT_SETUP.md) - GitHub Actions workflow setup
- [Environment Variables](ENV_SETUP.md) - Local and Vercel environment configuration

