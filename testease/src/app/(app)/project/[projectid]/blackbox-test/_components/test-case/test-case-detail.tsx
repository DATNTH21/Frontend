'use client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SheetClose, SheetContent, SheetFooter, SheetTitle } from '@/components/ui/sheet';
import { useGlobalStore } from '@/store/global-store';
import { TTestcase } from '@/types/test-case';
import { Edit, X } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';

type TestCaseDetailProps = {
  testCaseId: string | undefined;
  setOpen: Dispatch<SetStateAction<boolean>>;
  testCases: TTestcase[];
};

export default function TestCaseDetail({ setOpen, testCaseId, testCases }: TestCaseDetailProps) {
  const testCase = testCases.find((tc) => tc.test_case_id === testCaseId);
  const { openEditTestCaseDialog } = useGlobalStore();
  return (
    <SheetContent className='min-w-[35vw] !p-0 max-h-[100vh] flex flex-col gap-0'>
      <SheetClose
        className='z-10 absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-offset-0 ring-0 disabled:pointer-events-none data-[state=open]:bg-secondary'
        onClick={() => setOpen(false)}
      >
        <X className='h-4 w-4' />
        <span className='sr-only'>Close</span>
      </SheetClose>
      <div className='flex flex-col'>
        <SheetTitle className='!text-xl px-6 py-3 sticky'>Test Case Details</SheetTitle>
        <Separator />
      </div>
      <div className='flex-1 overflow-hidden'>
        <div className='min-h-0 h-full px-6 pt-3 pb-10 overflow-auto'>
          <div className='flex justify-between items-center'>
            <p className='text-muted-foreground font-semibold text-sm'>{testCaseId}</p>
            <Button
              variant='ghost'
              onClick={() => {
                setOpen(false);
                testCaseId && openEditTestCaseDialog(testCase!!);
              }}
            >
              <Edit /> Edit
            </Button>
          </div>
          <h1 className='font-semibold text-xl mb-4'>{testCase?.name || '--'}</h1>
          <div className='flex flex-col gap-4'>
            <div>
              <h3 className='font-semibold'>Objective:</h3>
              <p className=''>{testCase?.objective || '--'}</p>
            </div>

            <div>
              <h3 className='font-semibold'>Pre condition:</h3>
              <p className=''>{testCase?.pre_condition || '--'}</p>
            </div>

            <div>
              <h3 className='font-semibold'>Steps:</h3>
              {testCase?.steps?.map((step, index) => (
                <div key={index} className='ml-4 mb-2'>
                  <p className=''>
                    {index + 1}. {step}
                  </p>
                </div>
              )) || '--'}
            </div>
            <div>
              <h3 className='font-semibold'>Expected Result(s):</h3>
              <p className=''>{testCase?.expected_result || '--'}</p>
            </div>
          </div>
          <Separator className='my-4' />
          <div className='flex flex-wrap w-full gap-y-4'>
            <div className='w-3/6'>
              <h3 className='font-semibold'>Status:</h3>
              <p className=''>{testCase?.status || '--'}</p>
            </div>

            <div className='w-3/6'>
              <h3 className='font-semibold'>Priority:</h3>
              <p className=''>{testCase?.priority || '--'}</p>
            </div>

            <div className='w-3/6'>
              <h3 className='font-semibold'>Tester:</h3>
              <p className=''>{testCase?.tester || '--'}</p>
            </div>

            <div className='w-3/6'>
              <h3 className='font-semibold'>Test date:</h3>
              <p className=''>{testCase?.test_date || '--'}</p>
            </div>
          </div>
          <div className='flex w-full mt-4'>
            <div>
              <h3 className='font-semibold'>Remarks:</h3>
              <p className=''>{testCase?.remarks || '--'}</p>
            </div>
          </div>
        </div>
      </div>
    </SheetContent>
  );
}
