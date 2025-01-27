import AppSidebarHeader from './sidebar-header';
import { getProjectById, getProjectsByUser } from '@/api/project/project';
import { auth } from '@/auth';
import { Project } from '@/types/project.d';
import { redirect } from 'next/navigation';

export default async function SidebarHeaderServer({ projectId }: { projectId?: string }) {
  let projects: Project[] | [] = [];
  let currentProject: Project | undefined = undefined;
  const session = await auth();
  //console.log('Sidebar header session: ', session);
  if (session == null) {
    return <div>Loading</div>;
  }
  if (session.user) {
    const projectResponse = await getProjectsByUser();
    if (!projectResponse.data) {
      return <div>Loading</div>;
    } else {
      projects = projectResponse.data;
    }
  }
  if (projectId) {
    try {
      const currentProjectResponse = await getProjectById(projectId);
      if (currentProjectResponse.data) {
        currentProject = currentProjectResponse.data;
      } else {
        //If the projectID presents but there's error fetching data => redirect to all-project page
        redirect('/all-project');
      }
    } catch (error) {
      redirect('/all-project');
    }
  }
  return <AppSidebarHeader projects={projects} currentProject={currentProject} />;
}
