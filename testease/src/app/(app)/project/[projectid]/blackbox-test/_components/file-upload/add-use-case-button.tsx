'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Menu, PlusCircle } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { TUsecaseUpload, UsecaseUploadSchema } from '../../_data/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useUseCaseDescriptionUpload } from '@/api/use-case/use-case';
import Tiptap from '@/components/ui/tiptap/tiptap';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

export default function AddUseCaseButton() {
  const [useCaseContent, setUseCaseContent] = useState<string>();
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isTiptapOpen, setTiptapOpen] = useState<boolean>(false);
  const fileUploadMutation = useUseCaseDescriptionUpload({
    onSuccess: () => {
      //dosth
    },
    onError: () => {
      //dosth
    }
  });
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset
  } = useForm<TUsecaseUpload>({ resolver: zodResolver(UsecaseUploadSchema) });
  const submit = (data: TUsecaseUpload) => {
    console.log('Blackbox - Create use case button: ', data);
    //fileUploadMutation.mutate({ data: data });

    setDialogOpen(false);
    reset();
    setTiptapOpen(true);
  };
  return (
    <div>
      <AlertDialog open={isTiptapOpen} onOpenChange={setTiptapOpen}>
        <AlertDialogContent className='min-w-[80%]'>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit your use cases before processing</AlertDialogTitle>
          </AlertDialogHeader>
          <Tiptap
            initialContent={'Something to edit'}
            onContentChange={(content) => setUseCaseContent(content)}
          ></Tiptap>
          <AlertDialogFooter>
            <Button onClick={() => setTiptapOpen(false)} type='button' variant='ghost'>
              Cancel
            </Button>
            <Button type='submit' form='' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Creating
                </>
              ) : (
                <span>Confirm</span>
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className='cursor-pointer'>
            New Use Case <PlusCircle />
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Create Use Case</DialogTitle>
            <DialogDescription>
              Add your use case description file here, only .doc, .txt, .pdf and .md format are allow.
            </DialogDescription>
          </DialogHeader>
          <form id='upload-usecase-form' className='mt-4' onSubmit={handleSubmit(submit)}>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='description' className='mb-2'>
                Use Case description
              </Label>
              <Controller
                name='description'
                control={control}
                render={({ field: { onChange } }) => (
                  <Input
                    type='file'
                    placeholder='Upload project description .txt, .pdf, .doc'
                    accept='.txt, .doc, .pdf'
                    onChange={(e) => onChange(e.target.files?.[0] || null)}
                  ></Input>
                )}
              />
              {errors.description && <p className='text-destructive my-1'>{`${errors.description.message}`}</p>}
            </div>
          </form>
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='ghost'>
                Close
              </Button>
            </DialogClose>
            <Button type='submit' form='upload-usecase-form' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Creating
                </>
              ) : (
                <span>Upload</span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* <Button
        variant='outline'
        className='bg-accent p-2 rounded-lg cursor-pointer'
        onClick={() => handleMenuButtonClick()}
      >
        <Menu />
      </Button> */}
    </div>
  );
}
