'use client';

import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dispatch, SetStateAction } from 'react';
import { TestCaseConfigOption } from '@/types/user-config';
import { useDeleteUserConfigValue } from '@/api/user-config/user-config';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DeleteValueSchema, TDeleteValueSchema } from '../_data/schemas';
import { Loader2 } from 'lucide-react';
import { defaultPriority, defaultStatus } from '@/constants/data';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormMessage, Form } from '@/components/ui/form';

export default function DeleteFieldDialog({
  fields,
  fieldKey,
  setIsOpen
}: {
  fields: TestCaseConfigOption[];
  fieldKey: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const defaultValues = fieldKey == 'priority' ? defaultPriority : fieldKey == 'status' ? defaultStatus : [];
  const form = useForm<TDeleteValueSchema>({
    resolver: zodResolver(DeleteValueSchema)
  });
  const deleteValueMutation = useDeleteUserConfigValue({
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Delete value successfully'
      });
      setIsOpen(false);
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Delete new value failed',
        description: error.message
      });
      setIsOpen(false);
    }
  });
  const onSubmit = (data: TDeleteValueSchema) => {
    console.log('Value to delete: ', data);
    if (defaultValues.some((val) => val === data.value)) {
      toast({
        variant: 'destructive',
        title: 'Fail To delete selected value',
        description: 'Cannot delete selected value'
      });
      setIsOpen(false);
      return;
    }
    deleteValueMutation.mutate({ type: fieldKey, name: data.value });
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>DELETE FIELD</AlertDialogTitle>
        <AlertDialogDescription>Select a value to delete. You cannot delete default values.</AlertDialogDescription>
      </AlertDialogHeader>
      <Form {...form}>
        <form id='delete-field-form' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='value'
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Select a value' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {fields
                        .filter((field) => !defaultValues.includes(field.name))
                        .map((field, index) => (
                          <SelectItem key={index} value={field.name}>
                            {field.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormMessage />
        </form>
      </Form>

      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
        <Button type='submit' form='delete-field-form' disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Deleting...
            </>
          ) : (
            'Delete'
          )}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
