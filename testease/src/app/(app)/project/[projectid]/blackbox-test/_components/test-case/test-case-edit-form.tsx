'use client';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { TestCaseFormSchema, TTestcaseForm } from '@/types/test-case';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGlobalStore } from '@/store/global-store';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Asterisk, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUpdateTestCase } from '@/api/testcase/testcase';
import { toast } from '@/hooks/use-toast';
import { useUserConfig } from '@/api/user-config/user-config';

export default function TestCaseEditForm() {
  const { editTestCase, closeEditTestCaseDialog, isEditTestCaseOpen } = useGlobalStore();
  const userConfig = useUserConfig().data?.data;
  const priorities = userConfig?.priority.map((priority) => priority.name) || ['Low', 'Medium', 'High', 'Critical'];
  const statuses = userConfig?.status.map((status) => status.name) || ['Pass', 'Fail', 'In Progress', 'Untested'];
  console.log('Edit Test Case: ', editTestCase);
  console.log('User config: ', userConfig);
  console.log('priorities: ', priorities);
  console.log('statuses: ', statuses);

  const form = useForm<TTestcaseForm>({
    resolver: zodResolver(TestCaseFormSchema),
    defaultValues: {
      _id: editTestCase?._id || '',
      test_case_id: editTestCase?.test_case_id || '',
      name: editTestCase?.name || '',
      objective: editTestCase?.objective || '',
      pre_condition: editTestCase?.pre_condition,
      expected_result: editTestCase?.expected_result || '',
      status: editTestCase?.status,
      priority: editTestCase?.priority,
      steps:
        editTestCase?.steps?.map((step, index) => ({
          id: `${index}-${Date.now()}`,
          value: step
        })) || [],
      tester: editTestCase?.tester || undefined,
      test_date: editTestCase?.test_date || undefined
    }
  });

  useEffect(() => {
    if (editTestCase) {
      form.reset({
        _id: editTestCase._id,
        test_case_id: editTestCase.test_case_id,
        name: editTestCase.name,
        objective: editTestCase.objective,
        pre_condition: editTestCase.pre_condition,
        expected_result: editTestCase.expected_result,
        status: editTestCase.status,
        priority: editTestCase.priority,
        steps:
          editTestCase.steps?.map((step, index) => ({
            id: `${index}-${Date.now()}`,
            value: step
          })) || [],
        tester: editTestCase.tester,
        test_date: editTestCase.test_date
      });
    }
  }, [editTestCase, form.reset]);

  const { fields, append, remove, insert } = useFieldArray<TTestcaseForm>({
    control: form.control,
    name: 'steps'
  });

  const updateTestCaseMutation = useUpdateTestCase({
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Update test case successfully'
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Update test case failed',
        description: error.message
      });
    }
  });

  const onUpdateTestCase = (data: TTestcaseForm) => {
    const transformedData = {
      ...data,
      steps: data.steps.map((step) => step.value)
    };
    console.log('Transformed Data: ', transformedData);

    updateTestCaseMutation.mutate({ id: transformedData._id, data: transformedData });
    closeEditTestCaseDialog();
  };

  return (
    <AlertDialog open={isEditTestCaseOpen} onOpenChange={(open) => !open && closeEditTestCaseDialog()}>
      <AlertDialogContent
        key={editTestCase?._id || 'default'}
        className='min-w-[90vw] p-0 !flex flex-col h-[90vh] gap-0'
      >
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
              <div className='basis-3/4 overflow-y-auto pr-6'>
                <div className='space-y-6 py-4'>
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='flex items-center'>
                          Name <Asterisk className='text-destructive w-3 h-3 ml-1' />
                        </FormLabel>
                        <FormControl>
                          <Input placeholder='Enter test case name' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Objective Field */}
                  <FormField
                    control={form.control}
                    name='objective'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='flex items-center'>
                          Objective <Asterisk className='text-destructive w-3 h-3 ml-1' />
                        </FormLabel>
                        <FormControl>
                          <Textarea placeholder='Enter test case objective' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='pre_condition'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='flex items-center'>Precondition</FormLabel>
                        <FormControl>
                          <Textarea placeholder='Enter preconditions' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Steps Field */}
                  <div className='space-y-4'>
                    <FormLabel className='flex items-center'>
                      Steps <Asterisk className='text-destructive w-3 h-3 ml-1' />
                    </FormLabel>
                    {fields.map((field, index) => (
                      <div key={field.id} className='flex items-start gap-2'>
                        <FormField
                          control={form.control}
                          // Access the 'value' property of the step object
                          name={`steps.${index}.value`}
                          render={({ field }) => (
                            <FormItem className='flex-1'>
                              <FormControl>
                                <Textarea
                                  placeholder={`Step ${index + 1}`}
                                  // Spread field props correctly
                                  {...field}
                                  // Explicitly set value to string
                                  value={field.value || ''}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className='space-x-2 pt-2'>
                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            onClick={() => insert(index + 1, { id: `${Date.now()}-new`, value: '' })}
                          >
                            <PlusCircle className='h-4 w-4' />
                          </Button>
                          <Button type='button' variant='ghost' size='icon' onClick={() => remove(index)}>
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      onClick={() => append({ id: `${Date.now()}-new`, value: '' })}
                    >
                      Add Step
                    </Button>
                  </div>

                  {/* Expected Result Field */}
                  <FormField
                    control={form.control}
                    name='expected_result'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='flex items-center'>
                          Expected Result <Asterisk className='text-destructive w-3 h-3 ml-1' />
                        </FormLabel>
                        <FormControl>
                          <Textarea placeholder='Enter expected result' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Right Side Panel */}
              <div className='basis-1/4 border-l p-4 space-y-6'>
                {/* Status Field */}
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select status' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statuses.map((status, index) => (
                            <SelectItem key={index} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Priority Field */}
                <FormField
                  control={form.control}
                  name='priority'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select priority' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {priorities.map((priority, index) => (
                            <SelectItem key={index} value={priority}>
                              {priority}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tester */}
                <FormField
                  control={form.control}
                  name='tester'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center'>Tester</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter tester name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Remarks */}
                <FormField
                  control={form.control}
                  name='remarks'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center'>Remarks</FormLabel>
                      <FormControl>
                        <Textarea placeholder='Enter remarks' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
