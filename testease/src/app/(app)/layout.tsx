import Sidebar from '@/components/layouts/sidebar';

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      {children}
    </div>
  );
}
