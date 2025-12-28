import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Web App 2 - Demo',
  description: 'Second Next.js demo application',
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

