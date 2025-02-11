'use client';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Dispatch, SetStateAction } from 'react';
import { toast } from '@/hooks/use-toast';
import { TScenario } from '@/types/scenario';
import { useDeleteScenario } from '@/api/scenario/scenario';

export default function DeleteScenarioDialog({
  scenario,
  setIsOpen
}: {
  scenario: TScenario;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const deleteScenarioMutation = useDeleteScenario({
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'DELETE SCENARIO SUCCESSFULLY'
      });
    },
    onError: (error: Error) => {
      console.error('error', error);
      toast({
        variant: 'destructive',
        title: 'DELETE SCENARIO FAILED',
        description: error.message
      });
    }
  });
  const handleDelete = () => {
    deleteScenarioMutation.mutate(scenario._id);
    setIsOpen(false);
  };
  return (
    <AlertDialogContent
      onClick={(event) => {
        console.log('You clicked delete dialog: ', event.target);
      }}
    >
      <AlertDialogHeader>
        <AlertDialogTitle className='text-destructive font-semibold'>DELETE SCENARIO</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. Are you sure you want to permanently delete this scenario?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleDelete} className='bg-destructive text-destructive-foreground'>
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
