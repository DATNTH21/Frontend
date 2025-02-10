import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { Row } from '@tanstack/react-table';
<<<<<<< HEAD
import { useParams, useRouter } from 'next/navigation';
=======
import { ScenarioSchema } from '@/types/scenario';
import { AlertDialog } from '@/components/ui/alert-dialog';
import DeleteScenarioDialog from './delete-scenario-dialog';
>>>>>>> e5ee8bcc7f755b1e09bb7e27e38816c85727cac4

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
<<<<<<< HEAD
  const router = useRouter();
  const params = useParams<{ projectId: string; useCaseId: string }>();
=======
  const scenario = ScenarioSchema.parse(row.original);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

>>>>>>> e5ee8bcc7f755b1e09bb7e27e38816c85727cac4
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
<<<<<<< HEAD
                router.push(
                  `/project/${params.projectId}/blackbox-test/use-case/${params.useCaseId}/scenario/${row.id}`
                );
              }}
            >
              View Test Cases
=======
                setIsDeleteOpen(true);
              }}
            >
              <Trash /> Delete
>>>>>>> e5ee8bcc7f755b1e09bb7e27e38816c85727cac4
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default DataTableRowActions;
