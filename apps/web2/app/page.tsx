import Link from 'next/link';

export default function Home() {
  return (
    <main className="container">
      <h1>Welcome to Web App 2</h1>
      <p>This is the second Next.js demo application in the monorepo.</p>
      
      <div className="links">
        <Link href="/products" className="link-button">
          View Products
        </Link>
      </div>
    </main>
  );
}
