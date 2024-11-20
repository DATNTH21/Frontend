import type { Metadata } from 'next';
import '@/styles/globals.css';
import { AppProvider } from './provider';

export const metadata: Metadata = {
  title: 'Testease',
  description: 'Generate test cases with ease'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
