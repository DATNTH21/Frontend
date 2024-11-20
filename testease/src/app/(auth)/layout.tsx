import { Spinner } from '@/components/ui/spinner';
import Image from 'next/image';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
const AuthLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Suspense fallback={<Spinner />}>
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <div className='tablet:grid tablet:grid-cols-2'>
          <div className='tablet:col-span-1 p-16 tablet:p-24 laptop:p-40 desktop:p-80'>
            <Image src='/svg/login.svg' width={800} height={800} alt='login picture' />
          </div>
          {children}
        </div>
      </ErrorBoundary>
    </Suspense>
  );
};

export default AuthLayout;
