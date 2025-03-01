'use client';
import { useParams, useRouter } from 'next/navigation';
import { paths } from '@/lib/routes';

const BlackBoxTestPage = () => {
  const router = useRouter();
  const params = useParams<{ projectId: string }>();
  const projectId = params.projectId;
  if (!projectId) {
    router.push(paths.projectAll.getHref());
  }
  return <></>;
};

export default BlackBoxTestPage;
