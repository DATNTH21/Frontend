import { useState } from 'react';
import { MoreVertical, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { Dialog } from '@/components/ui/dialog';
import EditProjectDialog from './edit-project-dialog';
import DeleteProjectDialog from './delete-project-dialog';
import { AlertDialog } from '@/components/ui/alert-dialog';
import { projectSchema } from '../_data/schemas';
import { Row } from '@tanstack/react-table';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const project = projectSchema.parse(row.original);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <EditProjectDialog project={project} setIsOpen={setIsEditOpen} />
      </Dialog>
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DeleteProjectDialog project={project} setIsOpen={setIsDeleteOpen} />
      </AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size='icon' variant='ghost'>
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-50'>
          <DropdownMenuGroup>
            <DropdownMenuItem
              className='cursor-pointer'
              onSelect={() => {
                setIsEditOpen(true);
              }}
            >
              <Edit /> Edit
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className='text-destructive focus:text-destructive cursor-pointer'
              onSelect={() => {
                setIsDeleteOpen(true);
              }}
            >
              <Trash /> Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default DataTableRowActions;
