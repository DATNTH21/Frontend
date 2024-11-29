import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';
import FileStructure from '@/app/(app)/project/[projectId]/blackbox-test/_components/file-structure';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { testCaseSchema } from './_data/schema';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

export const metadata = {
  title: 'Black-box testing'
};

async function getData() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'src/app/(app)/project/[projectid]/blackbox-test/_data/test-case.json')
  );

  const testCases = JSON.parse(data.toString());

  return z.array(testCaseSchema).parse(testCases);
}

const BlackBoxTestPage = async () => {
  const data = await getData();

  return (
    <ResizablePanelGroup direction='horizontal' className='max-w-screen border'>
      <ResizablePanel defaultSize={15} minSize={0} maxSize={40}>
        {/* Folder/File Structure */}
        <FileStructure />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={85} minSize={60}>
        {/* Data table */}
        <div className='mx-auto p-2'>
          <DataTable columns={columns} data={data} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default BlackBoxTestPage;
