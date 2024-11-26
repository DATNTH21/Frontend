'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter } from '@/components/ui/table';
import { SearchIcon} from 'lucide-react';
import ActionCell from './_components/actionCell';
import EditProjectForm from './_components/editForm';

interface Project {
  id: string;
  title: string;
  link: string;
  description: string;
  status?: 'Generating' | 'Done' | 'Seen';
}

const AllProjectPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'PR-1',
      title: 'Demo project 1',
      link: '98 test cases',
      description: 'This is a test project description.',
      status: 'Generating',
    },
    {
      id: 'PR-2',
      title: 'Demo project 2',
      link: '65 test cases',
      description: 'Another example of a project description.',
      status: 'Done',
    },
    {
      id: 'PR-3',
      title: 'Demo project 3',
      link: '23 test cases',
      description: 'Yet another example description.',
      status: 'Seen',
    },
    {
      id: 'PR-4',
      title: 'Demo project 4',
      link: '45 test cases',
      description: 'More details about the project go here.',
      status: 'Generating',
    },
  ]);

  const handleSearch = () => {
    const results = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProjects(results);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const navigateDashboard = (projectId: string) => {
    router.push(`/project/${projectId}/dashboard`);
  };

  const navigateBlackboxTesting = (projectId: string) => {
    router.push(`/project/${projectId}/blackbox-test`);
  };

  const getRowStyle = (status: Project['status']) => {
    if (status === 'Generating') {
      return 'bg-gray-100 text-gray-500 cursor-not-allowed';
    }
    return 'cursor-pointer hover:bg-gray-100';
  };
  
  const getStatusStyle = (status: Project['status']) => {
    switch (status) {
      case 'Generating':
        return 'text-gray-500';
      case 'Done':
        return 'text-green-500';
      case 'Seen':
        return 'text-blue-500';
      default:
        return '';
    }
  };

  const handleEdit = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setDialogOpen(true);
    }
  };

  const handleSave = (updatedProject: Project) => {
    setProjects((prevProjects) =>
      prevProjects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
    closeDialog();
  };

  const handleDelete = (projectId: string) => {
    console.log(`Delete project ${projectId}`);
    // Add delete logic here
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedProject(null);
  };


  return (
    <div className='w-full'>
      {/* Search Bar */}
      <div className="mb-4 relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search projects..."
          className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>PROJECT TITLE</TableHead>
            <TableHead>QUICK LINK</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length > 0 ? (
            projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell
                  className={getRowStyle(project.status)}
                  onClick={() => navigateDashboard(project.id)}
                >
                  {project.id}
                </TableCell>
                <TableCell
                  className={getRowStyle(project.status)}
                  onClick={() => navigateDashboard(project.id)}
                >
                  <div>{project.title}</div>
                  <div>{project.description}</div>
                </TableCell>
                <TableCell
                  className={getRowStyle(project.status)}
                  onClick={() => navigateBlackboxTesting(project.id)}
                >
                  {project.link}
                </TableCell>
                <TableCell 
                  className={`${getRowStyle(project.status)} ${getStatusStyle(project.status)}`}>
                  {project.status}
                </TableCell>
                <TableCell className="text-right">
                  <ActionCell
                    projectId={project.id}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No projects found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total projects</TableCell>
            <TableCell className="text-right">{projects.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Dialog */}
      {dialogOpen && selectedProject && (
        <EditProjectForm
          project={selectedProject}
          onClose={closeDialog}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AllProjectPage;
