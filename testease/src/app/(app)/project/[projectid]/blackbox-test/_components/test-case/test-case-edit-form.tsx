'use client';
import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { TestCaseSchema, TTestcase } from '@/types/test-case';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGlobalStore } from '@/store/global-store';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Asterisk, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function TestCaseEditForm() {
  const { editTestCaseId, closeEditTestCaseDialog, isEditTestCaseOpen } = useGlobalStore();
  // Fetch test case data

  const form = useForm<TTestcase>({ resolver: zodResolver(TestCaseSchema) });

  const onUpdateTestCase = () => {};
  return (
    <AlertDialog open={isEditTestCaseOpen} onOpenChange={(open) => !open && closeEditTestCaseDialog()}>
      <AlertDialogContent className='min-w-[90vw] p-0 !flex flex-col h-[90vh] gap-0'>
        <button className='absolute top-4 right-4' onClick={() => closeEditTestCaseDialog()}>
          <X className='w-4 h-4' />
        </button>
        <AlertDialogHeader className='px-6 py-4'>
          <AlertDialogTitle>Edit Test Case</AlertDialogTitle>
          <VisuallyHidden asChild>
            <AlertDialogDescription>Make changes of your test case here</AlertDialogDescription>
          </VisuallyHidden>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            id='edit-test-case-form'
            className='flex-1 border-y-[1px] pl-6 overflow-hidden'
            onSubmit={form.handleSubmit(onUpdateTestCase)}
          >
            <div className='flex h-full'>
              <div className='basis-3/4'>
                <div className='pb-8 pr-4'>
                  <div className='mt-4 flex'>
                    <FormField
                      control={form.control}
                      name='title'
                      render={({ field }) => (
                        <FormItem className='w-full'>
                          <FormLabel className='flex items-center'>
                            Title <Asterisk className='text-destructive w-3 h-3' />
                          </FormLabel>
                          <FormControl>
                            <Input className='border-input' placeholder='Enter your title' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='mt-4 flex'></div>
                </div>
              </div>
              <div className='basis-1/4'></div>
            </div>
          </form>
        </Form>

        <AlertDialogFooter className='px-6 py-3'>
          <Button variant='outline' onClick={() => closeEditTestCaseDialog()}>
            Cancel
          </Button>
          <Button type='submit' form='edit-test-case-form'>
            Update
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
