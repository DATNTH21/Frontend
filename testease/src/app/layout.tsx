/* eslint-disable react-refresh/only-export-components */
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import { AppProvider } from './provider';
import { Toaster } from '@/components/ui/toaster';
import { auth } from '@/auth';

const inter = Inter({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Testease',
  description: 'Generate test cases with ease'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.variable}>
        <AppProvider session={session}>{children}</AppProvider>
        <Toaster />
      </body>
    </html>
  );
}
