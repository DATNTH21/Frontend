'use client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SheetClose, SheetContent, SheetFooter, SheetTitle } from '@/components/ui/sheet';
import { useGlobalStore } from '@/store/global-store';
import { Edit, X } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';

type TestCaseDetailProps = {
  testCaseId: string | undefined;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function TestCaseDetail({ setOpen, testCaseId }: TestCaseDetailProps) {
  const { openEditTestCaseDialog } = useGlobalStore();
  return (
    <SheetContent className='min-w-[35vw] !p-0 max-h-[100vh]'>
      <SheetClose
        className='z-10 absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-offset-0 ring-0 disabled:pointer-events-none data-[state=open]:bg-secondary'
        onClick={() => setOpen(false)}
      >
        <X className='h-4 w-4' />
        <span className='sr-only'>Close</span>
      </SheetClose>
      <SheetTitle className='!text-xl px-6 py-3 sticky'>Test Case Details</SheetTitle>
      <Separator />
      <div className='min-h-0 h-full px-6 py-3 overflow-auto'>
        <div className='flex justify-between items-center'>
          <p className='text-muted-foreground font-semibold text-sm'>{testCaseId}</p>
          <Button
            variant='ghost'
            onClick={() => {
              setOpen(false);
              testCaseId && openEditTestCaseDialog(testCaseId);
            }}
          >
            <Edit /> Edit
          </Button>
        </div>
        <h1 className='font-semibold text-xl mb-4'>Creation of user session upon successful login</h1>
        <div className='flex flex-col gap-4'>
          <div>
            <h3 className='font-semibold'>Description:</h3>
            <p className=''>Some descriptions here</p>
          </div>
          <div>
            <h3 className='font-semibold'>Preconditions:</h3>
            <p className=''>Some descriptions here</p>
          </div>
          <div>
            <h3 className='font-semibold'>Steps:</h3>
            <p className=''>Some descriptions here</p>
          </div>
          <div>
            <h3 className='font-semibold'>Expected Result(s):</h3>
            <p className=''>Some descriptions here</p>
          </div>
          <div>
            <h3 className='font-semibold'>Description:</h3>
            <p className=''>Some descriptions here</p>
          </div>
          <div>
            <h3 className='font-semibold'>Preconditions:</h3>
            <p className=''>Some descriptions here</p>
          </div>
          <div>
            <h3 className='font-semibold'>Steps:</h3>
            <p className=''>Some descriptions here</p>
          </div>
          <div>
            <h3 className='font-semibold'>Expected Result(s):</h3>
            <p className=''>Some descriptions here</p>
          </div>
        </div>
        <Separator className='my-4' />
        <div className='flex flex-wrap w-full gap-y-4'>
          <div className='w-3/6'>
            <h3 className='font-semibold'>Owner:</h3>
            <p className=''>Some descriptions here</p>
          </div>
          <div className='w-3/6'>
            <h3 className='font-semibold'>Status:</h3>
            <p className=''>Some descriptions here</p>
          </div>

          <div className='w-3/6'>
            <h3 className='font-semibold'>Priority:</h3>
            <p className=''>Some descriptions here</p>
          </div>
          <div className='w-3/6'>
            <h3 className='font-semibold'>Type:</h3>
            <p className=''>Some descriptions here</p>
          </div>
          <div className='w-full'>
            <h3 className='font-semibold'>Requirement:</h3>
            <p className=''>Some descriptions here</p>
          </div>
        </div>
      </div>
    </SheetContent>
  );
}
