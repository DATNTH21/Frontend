import { getProjectsByUser } from '@/api/project/project';
import AllProjectTable from './all-project-table';
import { columns } from './columns';
import { getUser } from '@/api/auth/auth';
import { Project } from '@/types/project.d';

export default async function AllProjectTableServer({ searchParam }: { searchParam: string }) {
  //console.log('All project table server search param: ', searchParam);
  const userResponse = await getUser();
  if (!userResponse.data) {
    return <div>Loading</div>;
  }

  let projects: Project[] | [] | undefined = undefined;

  const allProjectResponse = await getProjectsByUser(userResponse.data._id, searchParam);
  if (allProjectResponse.data && allProjectResponse.data.length != 0) {
    projects = allProjectResponse.data;
    //console.log('All project table server: ', projects);
  } else {
    return <div className='w-full flex justify-center items-start '>No project found</div>;
  }

  return <AllProjectTable columns={columns} data={projects} />;
}
