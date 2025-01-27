import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';
import FileStructure from '@/app/(app)/project/[projectId]/blackbox-test/_components/file-structure';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { TestCaseSchema } from './_data/schema';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import AddUseCaseButton from './_components/file-upload/add-use-case-button';
import Tiptap from '@/components/ui/tiptap/tiptap';

export const metadata = {
  title: 'Black-box testing'
};

async function getData() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'src/app/(app)/project/[projectid]/blackbox-test/_data/test-case.json')
  );

  const testCases = JSON.parse(data.toString());

  return z.array(TestCaseSchema).parse(testCases);
}

const BlackBoxTestPage = async () => {
  const data = await getData();

  return (
    <div className='flex-1 flex flex-col bg-background'>
      {/* Header */}
      <div className='sticky top-0 z-10 flex justify-between items-center p-4 border-b bg-background'>
        <h2 className='text-2xl font-bold tracking-tight'>Black Box Testing</h2>
        <div className='flex justify-center items-center gap-2'>
          <AddUseCaseButton />
        </div>
      </div>

      {/* Content Area */}
      <div className='w-full h-full flex-1'>
        <ResizablePanelGroup direction='horizontal' className='max-w-screen'>
          <ResizablePanel defaultSize={15} minSize={0} maxSize={40}>
            {/* Folder/File Structure */}
            <FileStructure />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={85} minSize={60}>
            <div className='mx-auto p-2'>{/* <DataTable columns={columns} data={data} /> */}</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default BlackBoxTestPage;
