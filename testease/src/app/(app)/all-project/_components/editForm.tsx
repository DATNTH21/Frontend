import React, { useState } from 'react';

interface Project {
    id: string;
    title: string;
    link: string;
    description: string;
}

interface EditProjectFormProps {
  project: Project;
  onClose: () => void;
  onSave: (updatedProject: Project) => void;
}

const EditProjectForm: React.FC<EditProjectFormProps> = ({ project, onClose, onSave }) => {
  const [formValues, setFormValues] = useState({
    title: project.title,
    description: project.description
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedProject = { ...project, ...formValues };
    onSave(updatedProject);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded p-6 w-96">
        <h3 className="text-lg font-bold">Edit Project</h3>
        <div className="mt-4">
          <p><strong>ID:</strong> {project.id}</p>
          <div className="mt-2">
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium">Description</label>
            <input
              type="text"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
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
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProjectForm;
