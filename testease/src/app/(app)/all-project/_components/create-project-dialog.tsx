'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Controller, useForm } from 'react-hook-form';
import { CreateProjectSchema, TCreateProjectSchema } from '../_data/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useCreateProject } from '@/api/project/project';
import { toast } from '@/hooks/use-toast';
import { useSession } from 'next-auth/react';

export default function CreateProjectDialog() {
  const { data } = useSession();
  const user = data?.user;
  console.log('all-project/create-project-dialog: Create project user data: ', user);
  const [open, setOpen] = useState(false);
  const createProjectMutation = useCreateProject({
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Create project successfully'
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Create project failed',
        description: error.message
      });
      setOpen(false);
    }
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
    reset
  } = useForm<TCreateProjectSchema>({ resolver: zodResolver(CreateProjectSchema) });

  const submit = (data: TCreateProjectSchema) => {
    console.log('all-project/create-project-dialog: Submit data: ', data);
    if (!user?.id) {
      toast({
        variant: 'destructive',
        title: 'Failed to create project',
        description: 'User ID is not available. Please try again.'
      });
      return; // Stop form submission if user ID is not available
    }

    //Send form data to server
    createProjectMutation.mutate({ data: data });
    //Clear the input on Submit
    reset();
    //Close the dialog
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create project</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>Input project name and description to create a new project</DialogDescription>
        </DialogHeader>
        <form id='create-project-form' className='mt-4' onSubmit={handleSubmit(submit)}>
          <div className='flex flex-col gap-1 mb-6'>
            <Label htmlFor='name' className='mb-2'>
              Project name
            </Label>
            <Input placeholder='Enter project name' {...register('name')}></Input>
            {errors.name && <p className='text-destructive my-1'>{`${errors.name.message}`}</p>}
          </div>
          <div className='flex flex-col gap-1'>
            <Label htmlFor='description' className='mb-2'>
              Project description
            </Label>
            <Input placeholder='Enter project description' {...register('description')}></Input>
            {errors.description && <p className='text-destructive my-1'>{`${errors.description.message}`}</p>}
          </div>
        </form>
        <DialogFooter>
          <Button variant='ghost' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type='submit' form='create-project-form' disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Creating
              </>
            ) : (
              <span>Create</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
