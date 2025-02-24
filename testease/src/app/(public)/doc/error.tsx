'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className='flex h-screen flex-col items-center justify-center gap-2'>
      <h2 className='text-center'>Cannot find this page</h2>
      <Button>
        <Link href={'/doc'}>Go back to document</Link>
      </Button>
    </main>
  );
}
