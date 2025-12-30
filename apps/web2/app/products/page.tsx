import { getProducts, Product } from '@/lib/api';
import Link from 'next/link';

export default async function ProductsPage() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    products = await getProducts();
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load products';
  }

  return (
    <div className="container">
      <h1>Products - Web App 2</h1>
      <p>This page fetches products from the API</p>

      {error && (
        <div className="error">
          <p>Error: {error}</p>
          <p>Make sure the API is running on http://localhost:3001</p>
        </div>
      )}

      {!error && products.length === 0 && (
        <p>No products found. Run the seed command to add dummy products.</p>
      )}

      {!error && products.length > 0 && (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {product.image && (
                <img src={product.image} alt={product.name} className="product-image" />
              )}
              <h2>{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <div className="product-info">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <span className={`product-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              {product.category && (
                <span className="product-category">{product.category}</span>
              )}
            </div>
          ))}
        </div>
      )}

      <Link href="/" className="back-link">
        ← Back to Home
      </Link>
    </div>
  );
}

