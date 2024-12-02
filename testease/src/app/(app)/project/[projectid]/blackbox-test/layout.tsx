'use client';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export default function BlackBoxLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const handleGenerateTestCase = () => {};
  const handleMenuButtonClick = () => {};
  return (
    <div className='flex-1 bg-background'>
      {/* Header */}
      <div className='sticky top-0 z-50 flex justify-between items-center p-4 border-b bg-background'>
        <h2 className='text-2xl font-bold tracking-tight'>Black Box Testing</h2>
        <div className='flex justify-center items-center gap-2'>
          <Button onClick={() => handleGenerateTestCase()} className='cursor-pointer'>
            Generate Test Case
          </Button>
          <Button
            variant='outline'
            className='bg-accent p-2 rounded-lg cursor-pointer'
            onClick={() => handleMenuButtonClick()}
          >
            <Menu />
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className='w-full'>{children}</div>
    </div>
  );
}
