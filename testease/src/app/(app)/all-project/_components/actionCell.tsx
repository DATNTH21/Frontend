import { useState } from 'react';
import { MoreVertical, Edit, Trash } from 'lucide-react';

interface ActionCellProps {
  projectId: string;
  onEdit: (projectId: string) => void;
  onDelete: (projectId: string) => void;
}

const ActionCell: React.FC<ActionCellProps> = ({ projectId, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="relative">
      <button
        className="p-2 rounded hover:bg-gray-200"
        onClick={toggleMenu}
      >
        <MoreVertical className="h-5 w-5 text-gray-600" />
      </button>
      {menuOpen && (
        <div className="absolute right-0 bg-white border rounded shadow-md w-32">
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"
            onClick={() => {
              onEdit(projectId);
              setMenuOpen(false);
            }}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </button>
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"
            onClick={() => {
              onDelete(projectId);
              setMenuOpen(false);
            }}
          >
            <Trash className="h-4 w-4 mr-2 text-red-500" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionCell;
