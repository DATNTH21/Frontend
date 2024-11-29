import React, { useState } from 'react';

interface CreateProjectFormProps {
  onClose: () => void;
  onCreate: (newProject: { name: string; description: string }) => void;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ onClose, onCreate }) => {
  const [projectName, setProjectName] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'text/plain' || file.type === 'application/msword')) {
      setUploadFile(file);
    } else {
      alert('Please upload a valid .txt or .doc file.');
    }
  };

  const handleSubmit = () => {
    if (!projectName.trim()) {
      alert('Project name is required.');
      return;
    }

    let description = "";

    if (uploadFile) {
      const reader = new FileReader();
      reader.onload = () => {
        description += `\n${reader.result}`;
        onCreate({ name: projectName, description });
        onClose();
      };
      reader.readAsText(uploadFile);
    } else {
      onCreate({ name: projectName, description });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded p-6 w-96">
        <h3 className="text-lg font-bold mb-4">Create Project</h3>
        <div>
          <label className="block text-sm font-medium">Project Name</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium">Project Description (.txt, .doc)</label>
          <input
            type="file"
            accept=".txt, .doc"
            onChange={handleFileUpload}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectForm;
