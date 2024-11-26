'use client';

import React, { useState } from 'react';
import CreateProjectForm from './createForm';

const CreateProjectButton: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreate = (newProject: { name: string; description: string }) => {
    // TODO: Add logic to handle project creation (e.g., API call or updating state)
    console.log('New Project:', newProject);
    setDialogOpen(false);
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={() => setDialogOpen(true)}
      >
        Create project
      </button>

      {dialogOpen && (
        <CreateProjectForm onClose={() => setDialogOpen(false)} onCreate={handleCreate} />
      )}
    </div>
  );
};

export default CreateProjectButton;
