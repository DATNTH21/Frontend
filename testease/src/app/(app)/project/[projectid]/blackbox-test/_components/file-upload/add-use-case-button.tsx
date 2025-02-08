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
import { TUsecaseUpload, UseCaseUploadSchema } from '../../_data/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
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
import { useCreateUseCase } from '@/api/use-case/use-case';
import { toast } from '@/hooks/use-toast';
import { getSocket } from '@/socket';
import { useQueryClient } from '@tanstack/react-query';

const SPLIT_STRING = '%#%--------%#%';

export default function AddUseCaseButton({ projectId }: { projectId: string }) {
  const editorRef = useRef<TipTapEditor | null>(null);
  const [useCaseContent, setUseCaseContent] = useState<string | undefined>(undefined);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isTiptapOpen, setTiptapOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  // Create use case mutation
  const createUseCaseMutation = useCreateUseCase({
    onSuccess: () => {
      setTiptapOpen(false);
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Create use case failed',
        description: error.message
      });
    }
  });
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset
  } = useForm<TUsecaseUpload>({ resolver: zodResolver(UseCaseUploadSchema) });
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

  useEffect(() => {
    const socket = getSocket();

    socket.on('use-case-generated', (data) => {
      console.log('Received use-cases:', data);
      queryClient.invalidateQueries({ queryKey: ['use-case'] });
      toast({
        variant: 'success',
        title: 'Create use case successfully'
      });
      setTiptapOpen(false);
    });
  }, []);

  const handleCreateUseCase = () => {
    const content = editorRef.current?.getText();
    const usecases = content!!
      .split(SPLIT_STRING)
      .slice(1, -1)
      .filter((usecase) => usecase.trim().length > 200); //filter out too short use cases (probably incorrect use cases)
    console.log('Use case content:', usecases);
    createUseCaseMutation.mutate({ data: { project_id: projectId, content: usecases } });
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
            <Editor ref={editorRef} editable editorType={editorMode.fullFeatured} content={useCaseContent} />
            <AlertDialogFooter>
              <Button onClick={() => setTiptapOpen(false)} type='button' variant='ghost'>
                Cancel
              </Button>
              <Button onClick={handleCreateUseCase} disabled={createUseCaseMutation.isPending}>
                {createUseCaseMutation.isPending ? (
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
              Add your use case description file here, only .docx, .txt, .pdf and .md format are allowed.
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
                    placeholder='Upload project description .txt, .pdf, .docx'
                    accept='.txt, .docx, .pdf'
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
