'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layouts/sidebar';
import FileStructure from '@/components/layouts/filestructure';

const BlackBoxTestPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
          <div className='flex-1 p-4'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='font-bold'>File 1</h3>
              <input
                type='text'
                placeholder='Search by Test case ID or Title'
                className='border p-2 rounded-lg w-1/2'
              />
              <button className='bg-gray-200 p-2 rounded-lg ml-4'>
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
            <table className='min-w-full bg-white border'>
              <thead>
                <tr>
                  <th className='py-2 px-4 '>ID</th>
                  <th className='py-2 px-4 '>Title</th>
                  <th className='py-2 px-4 '>Priority</th>
                  <th className='py-2 px-4 '>Status</th>
                  <th className='py-2 px-4 '>Owner</th>
                  <th className='py-2 px-4 '>Tags</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='py-2 px-4 '>Generated</td>
                  <td className='py-2 px-4 '>Test the login...</td>
                  <td className='py-2 px-4 '>Medium</td>
                  <td className='py-2 px-4 '>Done</td>
                  <td className='py-2 px-4 '>AI Generator</td>
                  <td className='py-2 px-4 '>Sprint 1</td>
                </tr>
                <tr>
                  <td className='py-2 px-4 '>Generated</td>
                  <td className='py-2 px-4 '>Verify that admin...</td>
                  <td className='py-2 px-4 '>High</td>
                  <td className='py-2 px-4 '>In Progress</td>
                  <td className='py-2 px-4 '>AI Generator</td>
                  <td className='py-2 px-4 '>Sprint 1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlackBoxTestPage;
