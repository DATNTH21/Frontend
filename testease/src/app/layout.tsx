import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import Sidebar from '@/components/layouts/sidebar';

import './globals.css';

export const metadata = {
  title: {
    template: '%s | Test Ease',
    default: 'Welcome | Test Ease'
  },
  description: 'Test Ease is a powerful tool that helps you generate test cases for your application.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${GeistMono.className} ${GeistSans.className} antialiased`}>
        <div className='flex min-h-screen'>
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
