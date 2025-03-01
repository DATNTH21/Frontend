import SearchBar from './_components/search-bar';
import CreateProjectDialog from './_components/create-project-dialog';
import { Suspense } from 'react';
import AllProjectTable from './_components/all-project-table';
import { columns } from './_components/columns';

const AllProjectPage = async (props: { searchParams?: Promise<{ search?: string }> }) => {
  const searchParams = await props.searchParams;
  const keyword = searchParams?.search || '';

  return (
    <div className='flex-1 mx-auto w-full'>
      {/* Search Bar */}
      <div className='w-full mb-4 flex items-center justify-between gap-4'>
        <SearchBar />
        <CreateProjectDialog />
      </div>
      {/* Table */}
      <Suspense fallback={<div>Loading...</div>}>
        <AllProjectTable columns={columns} searchParam={keyword} />
      </Suspense>
    </div>
  );
};

export default AllProjectPage;
