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
import { TTestcase } from '@/types/test-case';
import { useDeleteTestCase } from '@/api/testcase/testcase';
import { useQueryClient } from '@tanstack/react-query';

export default function DeleteTestCaseDialog({
  testcase,
  setIsOpen
}: {
  testcase: TTestcase;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();

  const deleteTestCaseMutation = useDeleteTestCase({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scenario'] });
      toast({
        variant: 'success',
        title: 'DELETE TEST CASE SUCCESSFULLY'
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'DELETE TEST CASE FAILED',
        description: error.message
      });
    }
  });
  const handleDelete = () => {
    deleteTestCaseMutation.mutate(testcase._id);
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
