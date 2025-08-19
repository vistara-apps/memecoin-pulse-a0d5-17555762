import './globals.css';
import '@coinbase/onchainkit/styles.css';
import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Memecoin Pulse',
  description: 'Spot the next memecoin pump before it happens',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
