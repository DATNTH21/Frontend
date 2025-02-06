'use client';
import { useParams, useRouter } from 'next/navigation';
import { paths } from '@/lib/routes';
import { useEffect } from 'react';
import { getSocket, initializeSocket, disconnectSocket } from '@/socket';
import { useSession } from 'next-auth/react';

const BlackBoxTestPage = () => {
  const router = useRouter();
  const params = useParams<{ projectId: string }>();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      initializeSocket(session.user.id);
      const socket = getSocket();

      // socket.on('error', (error) => {
      //   console.error('Socket error:', error);
      // });

      socket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
      });
    }

    return () => {
      disconnectSocket();
    };
  }, [session]);

  const projectId = params.projectId;
  if (!projectId) {
    router.push(paths.projectAll.getHref());
  }
  return <></>;
};

export default BlackBoxTestPage;
