import type { Metadata } from 'next';
import '@/styles/globals.css';
import { AppProvider } from './provider';
import { Toaster } from '@/components/ui/toaster';
import { auth } from '@/auth';

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
      <body>
        <AppProvider session={session}>{children}</AppProvider>
        <Toaster />
      </body>
    </html>
  );
}
