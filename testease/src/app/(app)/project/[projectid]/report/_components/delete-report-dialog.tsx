'use client';
//import { deleteBugReport } from '@/app/api/field/actions';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
//import { BugReport } from '@/types/api';
import { Dispatch, SetStateAction } from 'react';
import { TBugReportSchema } from '../_data/schemas';

export default function DeleteBugReportDialog({
  field,
  setIsOpen
}: {
  field: TBugReportSchema;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  //Add field id as additional argument to server action
  const handleDelete = () => {
    //deleteBugReport.bind(null, field._id);
    console.log("delete ", field._id);
    setIsOpen(false);
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>DELETE REPORT</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. Are you sure you want to permanently delete this report?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
