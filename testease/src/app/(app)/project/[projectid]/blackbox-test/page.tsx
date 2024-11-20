import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';
import FileStructure from '@/components/ui/tree/FileStructure';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { testCaseSchema } from './_data/schema';

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
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const data = await getData();

  return (
    <>
      {/* Folder/File Structure */}
      <FileStructure />

      {/* Test Cases Table */}
      <div className='container mx-auto py-10'>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default BlackBoxTestPage;
