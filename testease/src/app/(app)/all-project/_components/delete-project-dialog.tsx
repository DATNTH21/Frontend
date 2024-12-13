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
import { TProjectSchema } from '../_data/schemas';
import { useDeleteProject } from '@/api/project/project';
import { toast } from '@/hooks/use-toast';

export default function DeleteProjectDialog({
  project,
  setIsOpen
}: {
  project: TProjectSchema;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const deleteProjectMutation = useDeleteProject({
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'DELETE PROJECT SUCCESSFULLY'
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'DELETE PROJECT FAILED',
        description: error.message
      });
    }
  });
  const handleDelete = () => {
    deleteProjectMutation.mutate(project._id);
    setIsOpen(false);
  };
  return (
    <AlertDialogContent
      onClick={(event) => {
        console.log('You clicked delete dialog: ', event.target);
      }}
    >
      <AlertDialogHeader>
        <AlertDialogTitle>DELETE PROJECT</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. Are you sure you want to permanently delete this project?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
