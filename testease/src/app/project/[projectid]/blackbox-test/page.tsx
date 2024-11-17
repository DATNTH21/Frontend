import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';

import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { testCaseSchema } from './data/schema';

export const metadata = {
  title: 'Black-box testing'
};

async function getData() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'src/app/project/[projectid]/blackbox-test/data/test-case.json')
  );

  const tasks = JSON.parse(data.toString());

  return z.array(testCaseSchema).parse(tasks);
}

const BlackBoxTestPage = async () => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const data = await getData();

  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default BlackBoxTestPage;
