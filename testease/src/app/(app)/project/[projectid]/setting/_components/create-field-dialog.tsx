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
import { CreateFieldSchema, TCreateFieldSchema } from '../_data/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface FieldFormProps {
  type: 'testCase' | 'testRun';
}

export default function CreateProjectDialog({ type } : FieldFormProps) {
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting }
  } = useForm<TCreateFieldSchema>({ resolver: zodResolver(CreateFieldSchema) });

  const onSubmit = (data: TCreateFieldSchema) => {
    console.log('Create field data:', data, " and ", type);

    //Send form data to server
    setOpen(false);
  };
  return isSubmitting ? (
    <Spinner></Spinner>
  ) : (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create field</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>Input project name and description to create a new project</DialogDescription>
        </DialogHeader>
        <form id="create-field-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            {/* Field Name */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="field" className="mb-2">
                Field Name
              </Label>
              <Controller
                control={control}
                name="field"
                render={({ field: { ref, onChange, value } }) => (
                  <Input
                    ref={ref}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Enter field name"
                  />
                )}
              />
              {errors.field && <p className="text-destructive my-1">{`${errors.field.message}`}</p>}
            </div>

            {/* Values */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="values" className="mb-2">
                Values
              </Label>
              <Controller
                control={control}
                name="values"
                render={({ field: { ref, onChange, value } }) => (
                  <Input
                    ref={ref}
                    value={value?.join(', ')}
                    onChange={(e) => onChange(e.target.value.split(',').map((val) => val.trim()))}
                    placeholder="Comma-separated values"
                  />
                )}
              />
              {errors.values && <p className="text-destructive my-1">{`${errors.values.message}`}</p>}
            </div>

            {/* Type */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="type" className="mb-2">
                Type
              </Label>
              <Controller
                control={control}
                name="type"
                render={({ field: { ref, onChange, value } }) => (
                  <Input
                    ref={ref}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Enter type"
                  />
                )}
              />
              {errors.type && <p className="text-destructive my-1">{`${errors.type.message}`}</p>}
            </div>

            {/* Project */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="project" className="mb-2">
                Project ID
              </Label>
              <Controller
                control={control}
                name="project"
                render={({ field: { ref, onChange, value } }) => (
                  <Input
                    ref={ref}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Enter project ID"
                  />
                )}
              />
              {errors.project && <p className="text-destructive my-1">{`${errors.project.message}`}</p>}
            </div>
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
