'use client';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import UseCaseTree from './use-case-tree';
import UseCaseMainContent from './use-case-main-content';
import { useUsecases } from '@/api/use-case/use-case';
import LoadingOverlay from '@/components/ui/loading/loading-overlay';
import { Spinner } from '@/components/ui/spinner';

export default function UseCaseArea({ projectId }: { projectId: string }) {
  const { data, status } = useUsecases(projectId);
  const useCases = data?.data || [];
  return (
    <ResizablePanelGroup direction='horizontal' className='max-w-screen'>
      <ResizablePanel defaultSize={30} minSize={0}>
        <UseCaseTree useCases={useCases} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <div className='mx-auto h-full flex relative'>
          {status == 'error' && (
            <div className='flex-1 w-full h-full flex justify-center items-center'>Error fetching use cases</div>
          )}
          {status == 'pending' && (
            <div className='absolute inset-0 flex justify-center items-center'>
              <Spinner />
            </div>
          )}
          {status == 'success' && <UseCaseMainContent useCases={useCases} />}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
