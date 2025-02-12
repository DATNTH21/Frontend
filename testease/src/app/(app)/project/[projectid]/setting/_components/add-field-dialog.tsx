'use client';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { TestCaseConfigOption } from '@/types/user-config';
import { AddValueSchema, TAddValueSchema } from '../_data/schemas';
import { toast } from '@/hooks/use-toast';
import { useAddValueToUserConfig } from '@/api/user-config/user-config';

export default function AddFieldDialog({
  fields,
  fieldKey,
  setIsOpen
}: {
  fields: TestCaseConfigOption[];
  fieldKey: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<TAddValueSchema>({
    resolver: zodResolver(AddValueSchema)
  });

  const addValueMutation = useAddValueToUserConfig({
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Add new value successfully'
      });
      setIsOpen(false);
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Add new value failed',
        description: error.message
      });
      setIsOpen(false);
    }
  });

  const onSubmit = async (data: TAddValueSchema) => {
    const defaultValues = fields.map((field) => field.name);
    if (defaultValues.some((val) => val === data.value)) {
      toast({
        variant: 'destructive',
        title: 'Fail To Add New Value',
        description: 'Cannot add default value'
      });
      setIsOpen(false);
      return;
    }
    addValueMutation.mutate({ type: fieldKey, name: data.value });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Value</DialogTitle>
        <DialogDescription>Add value to the field and save changes.</DialogDescription>
      </DialogHeader>
      <form id='add-field-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4'>
          {/* Field Name */}
          <div className='flex flex-col gap-1'>
            <Label htmlFor='value' className='mb-2'>
              Value
            </Label>
            <Input {...register('value')} placeholder='Enter new value' />
            {errors.value && <p className='text-destructive my-1'>{`${errors.value.message}`}</p>}
          </div>
        </div>
      </form>
      <DialogFooter>
        <Button type='submit' disabled={isSubmitting} className='w-full sm:w-auto' form='add-field-form'>
          {isSubmitting ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Saving...
            </>
          ) : (
            'Save'
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
