'use client';
//import { deleteField } from '@/app/api/field/actions';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
//import { Field } from '@/types/api';
import { Dispatch, SetStateAction } from 'react';
import { TestCaseConfigOption } from '@/types/user-config';

export default function DeleteFieldDialog({
  setIsOpen
}: {
  fields: TestCaseConfigOption[];
  fieldKey: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  //Add field id as additional argument to server action
  const handleDelete = () => {};
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>DELETE FIELD</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. Are you sure you want to permanently delete this field?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
