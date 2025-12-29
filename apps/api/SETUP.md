# Supabase & Prisma Setup Guide

## Step 1: Create Supabase Project

1. Go to [Supabase](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in your project details:
   - Project name: `ms-monorepo` (or your choice)
   - Database password: (save this!)
   - Region: Choose closest to you
4. Wait for the project to be created (2-3 minutes)

## Step 2: Get Database Connection String

1. In your Supabase project, go to **Settings** → **Database**
2. Scroll down to **Connection string**
3. Select **URI** tab
4. Copy the connection string
5. Replace `[YOUR-PASSWORD]` with your database password
6. It should look like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```

## Step 3: Configure Environment Variables

1. In the `apps/api` directory, create a `.env` file:
   ```bash
   cd apps/api
   cp .env.example .env
   ```

2. Add your database URL:
   ```env
   DATABASE_URL="postgresql://postgres:your-password@db.xxxxx.supabase.co:5432/postgres"
   ```

3. (Optional) Add Supabase credentials:
   - Go to **Settings** → **API** in Supabase
   - Copy **Project URL** → `SUPABASE_URL`
   - Copy **anon public** key → `SUPABASE_ANON_KEY`

## Step 4: Run Migrations

1. Generate Prisma Client:
   ```bash
   npm run prisma:generate
   ```

2. Create and run migrations:
   ```bash
   npm run prisma:migrate
   ```
   - When prompted, name your migration: `init`

3. Seed the database with dummy products:
   ```bash
   npm run prisma:seed
   ```

## Step 5: Verify Setup

1. Start the API server:
   ```bash
   npm run dev
   ```

2. Test the API:
   ```bash
   curl http://localhost:3001/api/products
   ```

3. (Optional) Open Prisma Studio to view data:
   ```bash
   npm run prisma:studio
   ```

## Troubleshooting

### Connection Error
- Verify your database password is correct
- Check that your IP is allowed in Supabase (Settings → Database → Connection Pooling)
- Ensure the connection string format is correct

### Migration Errors
- Make sure you've run `prisma:generate` first
- Check that the database is accessible
- Verify the schema in `prisma/schema.prisma` is correct

### Seed Errors
- Ensure migrations have been run successfully
- Check that the database connection is working
- Verify the seed file path is correct

