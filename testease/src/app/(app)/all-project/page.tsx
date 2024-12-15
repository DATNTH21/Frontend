import SearchBar from './_components/search-bar';
import CreateProjectDialog from './_components/create-project-dialog';
import { Suspense } from 'react';
import AllProjectTableServer from './_components/all-project-table-server';

const AllProjectPage = () => {
  return (
    <div className='mx-auto p-2'>
      {/* Search Bar */}
      <div className='w-full mb-4 flex items-center justify-between gap-4'>
        <SearchBar />
        <CreateProjectDialog />
      </div>
      {/* Table */}
      <Suspense fallback={<div>Loading...</div>}>
        <AllProjectTableServer />
      </Suspense>
    </div>
  );
};

export default AllProjectPage;
