# API Application

Express.js API with Prisma ORM and Supabase integration.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Configure your Supabase database URL in `.env`:
```
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
```

4. Run Prisma migrations:
```bash
npm run prisma:migrate
```

5. Generate Prisma Client:
```bash
npm run prisma:generate
```

6. Seed the database with dummy products:
```bash
npm run prisma:seed
```

## Development

Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Health Check

- `GET /health` - Health check endpoint

## Prisma Commands

- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)
- `npm run prisma:seed` - Seed database with dummy data

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string (from Supabase)
- `SUPABASE_URL` - Supabase project URL (optional)
- `SUPABASE_ANON_KEY` - Supabase anonymous key (optional)
- `PORT` - Server port (default: 3001)
- `WEB1_URL` - Web1 app URL for CORS (default: http://localhost:3002)
- `WEB2_URL` - Web2 app URL for CORS (default: http://localhost:3003)

