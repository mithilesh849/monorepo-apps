import Link from 'next/link';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Web App 2',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="60" cy="60" r="55" stroke="#0070f3" strokeWidth="3" strokeDasharray="8 4" />
            <text x="60" y="75" textAnchor="middle" fontSize="48" fontWeight="bold" fill="#0070f3">
              404
            </text>
          </svg>
        </div>
        
        <h1 className="not-found-title">Page Not Found</h1>
        
        <p className="not-found-message">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <p className="not-found-submessage">
          Don't worry, let's get you back on track.
        </p>
        
        <div className="not-found-actions">
          <Link href="/" className="not-found-button primary">
            Go to Homepage
          </Link>
          <Link href="/products" className="not-found-button secondary">
            Browse Products
          </Link>
        </div>
        
        <div className="not-found-help">
          <p>Need help? Check out these links:</p>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

