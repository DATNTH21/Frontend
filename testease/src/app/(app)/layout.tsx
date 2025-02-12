'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { initializeSocket, disconnectSocket } from '@/socket';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      initializeSocket(session.user.id);
    }
    return () => {
      disconnectSocket();
    };
  }, [session]);

  return <>{children}</>;
}
