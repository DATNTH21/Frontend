'use client';

import { useSession } from 'next-auth/react';
import AddUseCaseButton from './file-upload/add-use-case-button';
import GenerateTestCaseButton from './generate-test-case-button';
import { useEffect } from 'react';
import { disconnectSocket, initializeSocket } from '@/socket';

export default function FeatureButtonsList({ projectId }: { projectId: string }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      initializeSocket(session.user.id);
    }
    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <div className='flex justify-center items-center gap-3'>
      <GenerateTestCaseButton />
      <AddUseCaseButton projectId={projectId} />
    </div>
  );
}
