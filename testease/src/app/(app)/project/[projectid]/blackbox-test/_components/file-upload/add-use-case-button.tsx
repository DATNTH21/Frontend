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
import { Loader2, PlusCircle } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { TUsecaseUpload, UsecaseUploadSchema } from '../../_data/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import Editor from '@/components/ui/tiptap/editor';
import { editorMode } from '@/components/ui/tiptap/extensions';
import { Editor as TipTapEditor } from '@tiptap/react';
import { readFile } from './file-handler';
import Toolbar from '@/components/ui/tiptap/toolbar/toolbar';

export default function AddUseCaseButton() {
  const editorRef = useRef<TipTapEditor | null>(null);
  const [useCaseContent, setUseCaseContent] = useState<string | undefined>(undefined);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isTiptapOpen, setTiptapOpen] = useState<boolean>(false);
  // const createTestcaseMutation = useCreateTestcaseMutation({
  //   onSuccess: () => {
  //     //dosth
  //   },
  //   onError: () => {
  //     //dosth
  //   }
  // });
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset
  } = useForm<TUsecaseUpload>({ resolver: zodResolver(UsecaseUploadSchema) });
  const submit = async (data: TUsecaseUpload) => {
    try {
      const fileContent = await readFile(data.description);
      setUseCaseContent(fileContent);
      setDialogOpen(false);
      setTiptapOpen(true);
    } catch (error) {
      console.error('Error processing file:', error);
    }
  };

  const handleOnUpdate = (editor: TipTapEditor) => {
    console.log('Update text: ', editor.getText());
  };

  const handleCreateTestCase = () => {
    //createTestcaseMutation.mutate({})
  };

  return (
    <div>
      {useCaseContent && (
        <AlertDialog open={isTiptapOpen} onOpenChange={setTiptapOpen}>
          <AlertDialogContent className='max-w-[80%] h-[90vh] flex flex-col'>
            <AlertDialogHeader>
              <AlertDialogTitle>Edit your use cases before processing</AlertDialogTitle>
              <VisuallyHidden>
                <AlertDialogDescription>Edit your use cases before processing</AlertDialogDescription>
              </VisuallyHidden>
            </AlertDialogHeader>
            <Editor
              ref={editorRef}
              editable
              editorType={editorMode.fullFeatured}
              content={useCaseContent}
              onUpdate={handleOnUpdate}
            />
            <AlertDialogFooter>
              <Button onClick={() => setTiptapOpen(false)} type='button' variant='ghost'>
                Cancel
              </Button>
              <Button onClick={handleCreateTestCase} disabled={isSubmitting}>
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
      )}

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
    </div>
  );
}
