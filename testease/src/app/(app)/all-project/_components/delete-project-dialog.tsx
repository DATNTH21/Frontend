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
import { useDeleteProject } from '@/api/project/project';
import { toast } from '@/hooks/use-toast';
import { Project } from '@/types/project';

export default function DeleteProjectDialog({
  project,
  setIsOpen
}: {
  project: Project;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  //console.log('Delete dialog project: ', project);
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
        <AlertDialogTitle className='text-destructive font-semibold'>DELETE PROJECT</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. Are you sure you want to permanently delete this project?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={handleDelete}
          className='bg-destructive text-destructive-foreground hover:bg-destructive/80'
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
