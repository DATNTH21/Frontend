'use client';

import { useState } from 'react';
import { MoreVertical, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from '@/components/ui/label';
import EditFieldForm from './editForm';

interface Field {
  id: string;
  field: string;
  values: string[];
  project: string;
  type: string;
}

interface ActionCellProps {
  field: Field;
}

const ActionCell: React.FC<ActionCellProps> = ({ field }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleEditSave = (updatedField: Field) => {
    console.log('Updated field:', updatedField);
    setMenuOpen(false); // Close the popover
  };

  const handleClick = () => {
    setMenuOpen(false); // Close the popover
  };

  const handleDelete = () => {
    console.log(`Delete field ${field.id}`);
    setMenuOpen(false); // Close the popover
  };

  return (
    <>
      <Popover open={menuOpen} onOpenChange={setMenuOpen}>
        <PopoverTrigger asChild>
          <Button className="bg-background hover:bg-sidebar-background text-primary">
            <MoreVertical />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48">
          <div className="grid gap-2">
            <EditFieldForm field={field} onSave={handleEditSave} />
            <Button
              className="w-fit text-left bg-background hover:bg-card"
              onClick={handleDelete}
            >
              <Trash className="h-4 w-4 mr-2 text-red-500" />
              <Label className="text-foreground">Delete</Label>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ActionCell;
