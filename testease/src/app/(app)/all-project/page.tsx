import SearchBar from './_components/search-bar';
import CreateProjectDialog from './_components/create-project-dialog';
import AllProjectTable from './_components/all-project-table';
import { TProjectSchema } from './_data/schemas';
import { columns } from './_components/columns';

const AllProjectPage = () => {
  const projects: TProjectSchema[] = [
    {
      _id: 'PR-1',
      title: 'Demo project 1',
      link: '98 test cases',
      description: null,
      status: 'Generating'
    },
    {
      _id: 'PR-2',
      title: 'Demo project 2',
      link: '65 test cases',
      description: null,
      status: 'Done'
    },
    {
      _id: 'PR-3',
      title: 'Demo project 3',
      link: '23 test cases',
      description: null,
      status: 'Seen'
    },
    {
      _id: 'PR-4',
      title: 'Demo project 4',
      link: '45 test cases',
      description: null,
      status: 'Failed'
    }
  ];

  return (
    <div className='mx-auto p-2'>
      {/* Search Bar */}
      <div className='w-full mb-4 flex items-center justify-between gap-4'>
        <SearchBar />
        <CreateProjectDialog />
      </div>
      {/* Table */}
      <AllProjectTable columns={columns} data={projects} />
    </div>
  );
};

export default AllProjectPage;
