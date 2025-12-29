import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET /api/products - Get all products (optionally filtered by appType)
router.get('/', async (req, res) => {
  try {
    const { appType } = req.query;
    
    const where = appType 
      ? { appType: parseInt(appType as string, 10) }
      : {};

    const products = await prisma.product.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST /api/products - Create new product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, image, category, appType, inStock } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    if (appType !== undefined && appType !== 1 && appType !== 2) {
      return res.status(400).json({ error: 'appType must be 1 or 2' });
    }

    const productData: {
      name: string;
      description?: string | null;
      price: number;
      image?: string | null;
      category?: string | null;
      appType?: number;
      inStock: boolean;
    } = {
      name,
      description,
      price: parseFloat(price),
      image,
      category,
      inStock: inStock !== undefined ? inStock : true,
    };

    if (appType !== undefined) {
      productData.appType = parseInt(appType, 10);
    }

    const product = await prisma.product.create({
      data: productData,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// PUT /api/products/:id - Update product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image, category, appType, inStock } = req.body;

    if (appType !== undefined && appType !== 1 && appType !== 2) {
      return res.status(400).json({ error: 'appType must be 1 or 2' });
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(image !== undefined && { image }),
        ...(category !== undefined && { category }),
        ...(appType !== undefined && { appType: parseInt(appType, 10) }),
        ...(inStock !== undefined && { inStock }),
      },
    });

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    if (error instanceof Error && error.message.includes('Record to update does not exist')) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE /api/products/:id - Delete product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting product:', error);
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;

