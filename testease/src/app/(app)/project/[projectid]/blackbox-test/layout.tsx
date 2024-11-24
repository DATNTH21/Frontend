import { Menu } from 'lucide-react';

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex-1 bg-white'>
      {/* Header */}
      <div className='flex justify-between items-center p-4 border-b'>
        <h2 className='text-2xl font-bold tracking-tight'>Black Box Testing</h2>
        <div className='flex justify-center'>
          <button className='bg-primary text-primary-foreground px-4 py-2 rounded-lg mr-2'>Generate Test Case</button>
          <button className='bg-accent p-2 rounded-lg'>
            <Menu />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className='flex h-full'>{children}</div>
    </div>
  );
}
