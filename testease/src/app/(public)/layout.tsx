'use client';
import Footer from '@/components/layouts/Footer/footer';
import Navbar from '@/components/layouts/Navbar/navbar';
import { ErrorBoundary } from 'react-error-boundary';
const PublicLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ErrorBoundary
      fallback={<div className='flex-1 h-full w-full flex justify-center items-center'>Something went wrong!</div>}
    >
      <Navbar />
      {children}
      <Footer />
    </ErrorBoundary>
  );
};

export default PublicLayout;
