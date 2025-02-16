import { MoreVertical, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Row } from '@tanstack/react-table';
import { ScenarioSchema } from '@/types/scenario';
import { AlertDialog } from '@/components/ui/alert-dialog';
import DeleteScenarioDialog from './delete-scenario-dialog';
import { useState } from 'react';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const scenario = ScenarioSchema.parse(row.original);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DeleteScenarioDialog scenario={scenario} setIsOpen={setIsDeleteOpen} />
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
