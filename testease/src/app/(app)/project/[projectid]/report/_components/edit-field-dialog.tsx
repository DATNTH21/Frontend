'use client';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import React, { Dispatch, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { EditBugReportSchema, TEditBugReportSchema, TBugReportSchema } from '../_data/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
//import { BugReport } from '@/types/api';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';

export default function EditBugReportDialog({
  field,
  setIsOpen
}: {
  field: TBugReportSchema;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<TEditBugReportSchema>({
    resolver: zodResolver(EditBugReportSchema),
    defaultValues: {
      field: field?.field,
      values: field?.values || [],
      project: field?.project,
      type: field?.type
    }
  });

  const onSubmit = async (data: TEditBugReportSchema) => {
    console.log(data);
    setIsOpen(false);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>EDIT FIELD</DialogTitle>
        <DialogDescription>Update the field settings and save changes.</DialogDescription>
      </DialogHeader>
      <form id="edit-field-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          {/* BugReport Name */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="field" className="mb-2">
              BugReport Name
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
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
          form="edit-field-form"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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