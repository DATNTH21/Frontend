'use client'

import React, { Dispatch, SetStateAction } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { EditTestReportSchema, TTestReportSchema, TEditTestReportSchema } from "../_data/schemas";
import { Loader2 } from "lucide-react";

export default function EditTestReportDialog({
  report,
  setIsOpen
}: {
  report: TTestReportSchema;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TEditTestReportSchema>({
    resolver: zodResolver(EditTestReportSchema),
    defaultValues: {
      title: report?.title,
      project: report?.project,
      functionName: report?.functionName,
      testSummary: report?.testSummary,
      testResults: report?.testResults
    }
  });

  const onSubmit = (data: TEditTestReportSchema) => {
    console.log("Edit field data:", data);
    setIsOpen(false);
  };

  return (
    <DialogContent className="min-w-max">
      <DialogHeader>
        <DialogTitle>Edit Test Summary Report</DialogTitle>
      </DialogHeader>
      <form id="create-test-report-form" onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div>
          <Label htmlFor="title">Report Title</Label>
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <Input {...field} placeholder="Report Title" />
            )}
          />
          {errors.title && <p className="text-destructive">{errors.title.message}</p>}
        </div>
        <div>
          <Label htmlFor="project">Project</Label>
          <Controller
            control={control}
            name="project"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="demo">Demo Project</SelectItem>
                  <SelectItem value="project2">Project 2</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.project && <p className="text-destructive">{errors.project.message}</p>}
        </div>
        <div>
          <Label htmlFor="functionName">Function Name</Label>
          <Controller
            control={control}
            name="functionName"
            render={({ field }) => <Input {...field} placeholder="e.g., Logout" />}
          />
          {errors.functionName && <p className="text-destructive">{errors.functionName.message}</p>}
        </div>
        <div>
          <Label htmlFor="testSummary">Test Summary</Label>
          <Controller
            control={control}
            name="testSummary"
            render={({ field }) => (
              <Textarea {...field} placeholder="Write in brief about the problem (e.g., Test Objective + Actual result vs. Expected result)" />
            )}
          />
          {errors.testSummary && <p className="text-destructive">{errors.testSummary.message}</p>}
        </div>
        <div>
          <Label htmlFor="testResults">Test Results</Label>
          <Controller
            control={control}
            name="testResults"
            render={({ field }) => (
              <Textarea {...field} placeholder="Write in brief about the problem (e.g., Test Objective + Actual result vs. Expected result)" />
            )}
          />
          {errors.testResults && <p className="text-destructive">{errors.testResults.message}</p>}
        </div>
      </form>

      <DialogFooter className="mt-4">
        <Button variant="secondary" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" form="edit-bug-report-form" disabled={isSubmitting}>
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
