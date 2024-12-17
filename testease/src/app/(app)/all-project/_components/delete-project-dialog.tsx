'use client';
import { deleteProject } from '@/app/_api/project/actions';
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

export default function DeleteProjectDialog({
  project,
  setIsOpen
}: {
  project: TProjectSchema;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  //Add project id as additional argument to server action
  const handleDelete = () => {
    deleteProject.bind(null, project._id);
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
