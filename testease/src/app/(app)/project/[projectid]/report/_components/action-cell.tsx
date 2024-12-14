'use client';

import { useState } from 'react';
import { MoreVertical, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import DeleteBugReportDialog from './delete-report-dialog';
import EditBugReportDialog from './edit-field-dialog';
import { AlertDialog } from '@/components/ui/alert-dialog';
import { Dialog } from '@/components/ui/dialog';
import { TBugReportSchema } from '../_data/schemas';

const ActionCell: React.FC<{ field: TBugReportSchema }> = ({ field }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <EditBugReportDialog field={field} setIsOpen={setIsEditOpen} />
      </Dialog>
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DeleteBugReportDialog field={field} setIsOpen={setIsDeleteOpen} />
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
              <Edit /> Configure
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className='text-destructive focus:text-destructive cursor-pointer'
              onSelect={() => setIsDeleteOpen(true)}
            >
              <Trash /> Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ActionCell;
