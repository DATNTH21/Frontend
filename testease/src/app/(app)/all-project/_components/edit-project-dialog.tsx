'use client';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import React, { Dispatch, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { EditProjectSchema, TEditProjectSchema } from '../_data/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Project } from '@/types/project';
import { Textarea } from '@/components/ui/textarea';

export default function EditProjectDialog({
  project,
  setIsOpen
}: {
  project: Project;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors, isLoading }
  } = useForm<TEditProjectSchema>({
    resolver: zodResolver(EditProjectSchema),
    defaultValues: {
      name: project?.name,
      description: project?.description || undefined
    }
  });

  const onSubmit = async (data: TEditProjectSchema) => {
    console.log(data);
    setIsOpen(false);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>EDIT PROJECT</DialogTitle>
        <DialogDescription>Make changes to your project here. Click save when you're done.</DialogDescription>
      </DialogHeader>
      <form id='edit-project-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-1 mb-6'>
          <Label htmlFor='name' className='mb-2'>
            Project name
          </Label>
          <Controller
            control={control}
            name='name'
            rules={{ required: true }}
            render={({ field: { ref, onChange, value } }) => (
              <Input ref={ref} type='text' value={value} onChange={(e) => onChange(e.target.value)}></Input>
            )}
          />
          {errors.name && <p className='text-destructive my-1'>{`${errors.name.message}`}</p>}
        </div>
        <div className='flex flex-col gap-1'>
          <Label htmlFor='description' className='mb-2'>
            Project description
          </Label>
          <Controller
            name='description'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Textarea
                placeholder='Write something to describe the project'
                value={value}
                onChange={(e) => onChange(e.target.value)}
              ></Textarea>
            )}
          />
          {errors.description && <p className='text-destructive my-1'>{`${errors.description.message}`}</p>}
        </div>
      </form>
      <DialogFooter>
        <Button type='submit' disabled={isLoading} className='w-full sm:w-auto' form='edit-project-form'>
          <>
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Saving...
              </>
            ) : (
              'Save'
            )}
          </>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
