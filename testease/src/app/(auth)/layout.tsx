import Footer from '@/components/layouts/Footer/footer';
import Navbar from '@/components/layouts/Navbar/navbar';
import Image from 'next/image';
const AuthLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      <div className='relative'>
        <div className='flex flex-col'>
          <main className='flex-1 flex'>
            <div className='md:grid md:grid-cols-2'>
              <div className='md:col-span-1 p-16 md:p-24 xl:p-40 2xl:p-80'>
                <Image src='svg/login.svg' width={800} height={800} alt='login picture' />
              </div>
              {children}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthLayout;
