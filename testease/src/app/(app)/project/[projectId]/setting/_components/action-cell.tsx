'use client';

import { useState } from 'react';
import { MoreVertical, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import DeleteFieldDialog from './delete-field-dialog';
import AddFieldDialog from './add-field-dialog';
import { AlertDialog } from '@/components/ui/alert-dialog';
import { Dialog } from '@/components/ui/dialog';
import { TestCaseConfigOption } from '@/types/user-config';

const ActionCell: React.FC<{ field: TestCaseConfigOption[]; fieldKey: string }> = ({ field, fieldKey }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <AddFieldDialog fields={field} fieldKey={fieldKey} setIsOpen={setIsEditOpen} />
      </Dialog>
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DeleteFieldDialog fields={field} fieldKey={fieldKey} setIsOpen={setIsDeleteOpen} />
      </AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size='icon' variant='ghost'>
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-50'>
          <DropdownMenuGroup>
            <DropdownMenuItem className='cursor-pointer' onSelect={() => setIsEditOpen(true)}>
              <Edit /> Add value
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className='text-destructive focus:text-destructive cursor-pointer'
              onSelect={() => setIsDeleteOpen(true)}
            >
              <Trash /> Remove Value
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ActionCell;
