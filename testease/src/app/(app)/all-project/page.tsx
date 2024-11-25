'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter } from '@/components/ui/table';
import { SearchIcon } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  link: string;
  description: string;
}

const AllProjectPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'PR-1',
      title: 'Demo project',
      link: '98 test cases',
      description: 'This projecttttttttttttttttttttttttttttttttttt ahdioahdioabsnsafks'
    },
    {
      id: 'PR-2',
      title: 'Demo project',
      link: '98 test cases',
      description: 'This projecttttttttttttttttttttttttttttttttttt ahdioahdioabsnsafks'
    },
    {
      id: 'PR-3',
      title: 'Demo project',
      link: '98 test cases',
      description: 'This projecttttttttttttttttttttttttttttttttttt ahdioahdioabsnsafks'
    },
    {
      id: 'PR-4',
      title: 'Demo project',
      link: '98 test cases',
      description: 'This projecttttttttttttttttttttttttttttttttttt ahdioahdioabsnsafks'
    }
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

  // Handle Enter key press
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

  return (
    <div className='w-full'>
      {/* Search Bar */}
      <div className='mb-4 relative w-full'>
        <SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500' />
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Search projects...'
          className='w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>ID</TableHead>
            <TableHead>PROJECT TITLE</TableHead>
            <TableHead>QUICK LINK</TableHead>
            <TableHead className='text-right'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length > 0 ? (
            projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell
                  className='font-medium cursor-pointer hover:bg-gray-100'
                  onClick={() => navigateDashboard(project.id)}
                >
                  {project.id}
                </TableCell>
                <TableCell className='cursor-pointer hover:bg-gray-100' onClick={() => navigateDashboard(project.id)}>
                  <div>{project.title}</div>
                  <div>{project.description}</div>
                </TableCell>
                <TableCell
                  className='cursor-pointer hover:bg-gray-100'
                  onClick={() => navigateBlackboxTesting(project.id)}
                >
                  {project.link}
                </TableCell>
                <TableCell className='text-right'>ACTION</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className='text-center'>
                No projects found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total projects</TableCell>
            <TableCell className='text-right'>{projects.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default AllProjectPage;
