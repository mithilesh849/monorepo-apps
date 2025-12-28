import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Web App 1 - Demo',
  description: 'First Next.js demo application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

