# Products API Setup Guide

This guide explains how to use the Products API with Supabase and Prisma ORM.

## What Was Set Up

### API (`apps/api`)
- ✅ Prisma ORM with PostgreSQL (Supabase)
- ✅ Product model with CRUD operations
- ✅ RESTful API endpoints for products
- ✅ CORS configured for web1 and web2
- ✅ Seed data with 8 dummy products

### Web Apps
- ✅ API client library (`lib/api.ts`) for both web1 and web2
- ✅ Products listing page (`/products`) in both apps
- ✅ TypeScript types for Product interface

## Quick Start

### 1. Install Dependencies

From the root directory:
```bash
npm install
```

### 2. Set Up Supabase Database

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Get your database connection string from Settings → Database
3. See detailed instructions in `apps/api/SETUP.md`

### 3. Configure API

```bash
cd apps/api
cp .env.example .env
```

Add your Supabase database URL to `.env`:
```
DATABASE_URL="postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres"
```

### 4. Run Database Migrations

```bash
cd apps/api
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### 5. Start All Applications

From the root directory:
```bash
npm run dev
```

This will start:
- API: http://localhost:3001
- Web1: http://localhost:3002
- Web2: http://localhost:3003

## API Endpoints

### Get All Products
```bash
GET http://localhost:3001/api/products
```

### Get Single Product
```bash
GET http://localhost:3001/api/products/:id
```

### Create Product
```bash
POST http://localhost:3001/api/products
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "image": "https://example.com/image.jpg",
  "category": "Electronics",
  "inStock": true
}
```

### Update Product
```bash
PUT http://localhost:3001/api/products/:id
Content-Type: application/json

{
  "price": 89.99,
  "inStock": false
}
```

### Delete Product
```bash
DELETE http://localhost:3001/api/products/:id
```

## Using the API in Web Apps

### Example: Fetch Products

```typescript
import { getProducts } from '@/lib/api';

// In a Server Component (Next.js 13+)
const products = await getProducts();

// In a Client Component
'use client';
import { useEffect, useState } from 'react';
import { getProducts, Product } from '@/lib/api';

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Available Functions

- `getProducts()` - Fetch all products
- `getProduct(id)` - Fetch single product
- `createProduct(product)` - Create new product
- `updateProduct(id, product)` - Update product
- `deleteProduct(id)` - Delete product

## Product Model

```typescript
interface Product {
  id: string;              // Auto-generated CUID
  name: string;            // Required
  description: string | null;
  price: number;           // Required
  image: string | null;
  category: string | null;
  inStock: boolean;        // Default: true
  createdAt: string;       // Auto-generated
  updatedAt: string;       // Auto-updated
}
```

## Testing

### Test API Directly

```bash
# Get all products
curl http://localhost:3001/api/products

# Get single product (replace ID)
curl http://localhost:3001/api/products/clxxxxx...

# Create product
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "price": 29.99,
    "description": "A test product"
  }'
```

### Test in Web Apps

1. Start all apps: `npm run dev`
2. Visit http://localhost:3002/products (Web1)
3. Visit http://localhost:3003/products (Web2)
4. Both should display the same products from the API

## Prisma Commands

```bash
cd apps/api

# Generate Prisma Client
npm run prisma:generate

# Create and run migrations
npm run prisma:migrate

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Seed database with dummy products
npm run prisma:seed
```

## Troubleshooting

### API not connecting to database
- Verify `DATABASE_URL` in `.env` is correct
- Check Supabase project is active
- Ensure database password is correct

### CORS errors in web apps
- Verify API is running on port 3001
- Check CORS configuration in `apps/api/src/index.ts`
- Ensure web apps are using correct API URL

### Products not showing
- Run seed command: `npm run prisma:seed`
- Check API is running: `curl http://localhost:3001/api/products`
- Verify database connection in Prisma Studio

## Next Steps

- Add authentication/authorization
- Add product images upload
- Add pagination for products list
- Add search and filtering
- Add product reviews/ratings

