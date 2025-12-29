import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding products...');

  const products = [
    {
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      category: 'Electronics',
      appType: 1, // Web1
      inStock: true,
    },
    {
      name: 'Smart Watch',
      description: 'Feature-rich smartwatch with fitness tracking',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      category: 'Electronics',
      appType: 1, // Web1
      inStock: true,
    },
    {
      name: 'Laptop Stand',
      description: 'Ergonomic aluminum laptop stand for better posture',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
      category: 'Accessories',
      appType: 1, // Web1
      inStock: true,
    },
    {
      name: 'Mechanical Keyboard',
      description: 'RGB backlit mechanical keyboard with blue switches',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1587829741301-dc528b74c769?w=500',
      category: 'Accessories',
      appType: 1, // Web1
      inStock: true,
    },
    {
      name: 'USB-C Hub',
      description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500',
      category: 'Accessories',
      appType: 2, // Web2
      inStock: false,
    },
    {
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse with long battery life',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
      category: 'Accessories',
      appType: 2, // Web2
      inStock: true,
    },
    {
      name: 'Monitor 27"',
      description: '4K UHD 27-inch monitor with HDR support',
      price: 449.99,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
      category: 'Electronics',
      appType: 2, // Web2
      inStock: true,
    },
    {
      name: 'Webcam HD',
      description: '1080p HD webcam with built-in microphone',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1587825147138-346c006b1e98?w=500',
      category: 'Electronics',
      appType: 2, // Web2
      inStock: true,
    },
  ];

  // Clear existing products
  await prisma.product.deleteMany();

  // Create new products
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

