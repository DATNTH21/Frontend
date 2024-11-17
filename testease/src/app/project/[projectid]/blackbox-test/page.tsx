import Sidebar from '@/components/layouts/sidebar';
import FileStructure from '@/components/layouts/filestructure';
import { Payment, columns } from './columns';
import { DataTable } from './data-table';

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.

  return Array.from({ length: 100 }, (_, i) => ({
    id: String(i + 1),
    amount: Math.round(Math.random() * 1000),
    status: Math.random() > 0.5 ? 'pending' : 'processing',
    email: `user${i + 1}@example.com`
  }));
}

const BlackBoxTestPage = async () => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const data = await getData();

  return (
    <div className='flex min-h-screen'>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className='flex-1 bg-white'>
        {/* Header */}
        <div className='flex justify-between items-center p-4 border-b'>
          <h2 className='text-2xl font-semibold'>Black Box Testing</h2>
          <div>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg mr-2'>Generate Test Case</button>
            <button className='bg-gray-200 p-2 rounded-lg'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 text-gray-700'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7' />
              </svg>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className='flex h-full'>
          {/* Folder/File Structure */}
          <FileStructure />

          {/* Test Cases Table */}

          <div className='container mx-auto py-10'>
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlackBoxTestPage;
