import { getProjectsByUser } from '@/api/project/project';
import AllProjectTable from './all-project-table';
import { columns } from './columns';
import { getUser } from '@/api/auth/auth';
import { Project } from '@/types/project.d';

export default async function AllProjectTableServer() {
  const userResponse = await getUser();
  if (!userResponse.data) {
    return <div>Loading</div>;
  }

  let projects: Project[] | [] | undefined = undefined;

  const allProjectResponse = await getProjectsByUser(userResponse.data._id);
  if (allProjectResponse.data && allProjectResponse.data.length != 0) {
    projects = allProjectResponse.data;
    //console.log('All project table server: ', projects);
  } else {
    return <div>No project for this user</div>;
  }

  return <AllProjectTable columns={columns} data={projects} />;
}
