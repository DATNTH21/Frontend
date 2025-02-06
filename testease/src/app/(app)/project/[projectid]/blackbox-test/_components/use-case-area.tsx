'use client';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import UseCaseTree from './use-case-tree';
import UseCaseMainContent from './use-case-main-content';
import { useUsecases } from '@/api/use-case/use-case';

export default function UseCaseArea({ projectId }: { projectId: string }) {
  const useCases = useUsecases(projectId).data?.data || [];
  return (
    <ResizablePanelGroup direction='horizontal' className='max-w-screen'>
      <ResizablePanel defaultSize={15} minSize={0} maxSize={40}>
        <UseCaseTree useCases={useCases} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={85} minSize={60}>
        <div className='mx-auto h-full flex'>
          <UseCaseMainContent useCases={useCases} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
