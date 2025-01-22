import { Suspense } from "react";
import SearchBar from './_components/search-bar';
import CreateProjectDialog from './_components/create-project-dialog';
import AllProjectTable from './_components/all-project-table';
import { columns } from './_components/columns';
import { getProjects } from '@/api/project/project';

export default async function AllProjectPage() {
  const projects = getProjects("673f2e9bedec8e80219667a3");

  return (
    <div className='mx-auto p-2'>
      {/* Search Bar */}
      <div className='w-full mb-4 flex items-center justify-between gap-4'>
        <SearchBar />
        <CreateProjectDialog />
      </div>
      {/* Table */}
      <Suspense
        fallback={
          <>hi</>
        }
      >
        <AllProjectTable columns={columns} data={projects} />
      </Suspense>
    </div>
  );
};
