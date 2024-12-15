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
import { EditBugReportSchema, TBugReportSchema, TEditBugReportSchema } from "../_data/schemas";
import { Loader2 } from "lucide-react";

export default function EditBugReportDialog({
  report,
  setIsOpen
}: {
  report: TBugReportSchema;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TEditBugReportSchema>({
    resolver: zodResolver(EditBugReportSchema),
    defaultValues: {
      title: report?.title,
      project: report?.project,
      bugId: report?.bugId,
      reportedBy: report?.reportedBy,
      assignTo: report?.assignTo,
      status: report?.status,
      functionName: report?.functionName,
      problemSummary: report?.problemSummary,
      stepsToReproduce: report?.stepsToReproduce,
      severity: report?.severity || "Medium",
      priority: report?.priority || "Medium",
    }
  });

  const onSubmit = (data: TEditBugReportSchema) => {
    console.log("Edit field data:", data);
    setIsOpen(false);
  };

  return (
    <DialogContent className="min-w-max">
      <DialogHeader>
        <DialogTitle>Edit Bug/Defect Report</DialogTitle>
      </DialogHeader>
      <form id="edit-bug-report-form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-5 gap-4 max-w-[800px] min-w-[600px]">
        <div className="col-span-5">
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
        
        {/* Left Section */}
        <div className="col-span-2 grid gap-4">
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
            <Label htmlFor="bugId">Bug ID</Label>
            <Controller
              control={control}
              name="bugId"
              render={({ field }) => (
                <Input {...field} placeholder="B001" disabled />
              )}
            />
          </div>

          <div>
            <Label htmlFor="reportedBy">Reported by</Label>
            <Controller
              control={control}
              name="reportedBy"
              render={({ field }) => (
                <Input {...field} placeholder="Your Name" />
              )}
            />
            {errors.reportedBy && <p className="text-destructive">{errors.reportedBy.message}</p>}
          </div>

          <div>
            <Label htmlFor="assignTo">Assign to</Label>
            <Controller
              control={control}
              name="assignTo"
              render={({ field }) => (
                <Input {...field} placeholder="Name/ID of the developer who will fix the defect" />
              )}
            />
            {errors.assignTo && <p className="text-destructive">{errors.assignTo.message}</p>}
          </div>

          <div>
            <Label>Status</Label>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select {...field}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && <p className="text-destructive">{errors.status.message}</p>}
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-3 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label htmlFor="functionName">Function Name</Label>
            <Controller
              control={control}
              name="functionName"
              render={({ field }) => <Input {...field} placeholder="e.g., Logout" />}
            />
            {errors.functionName && <p className="text-destructive">{errors.functionName.message}</p>}
          </div>

          <div className="col-span-2">
            <Label htmlFor="problemSummary">Problem Summary</Label>
            <Controller
              control={control}
              name="problemSummary"
              render={({ field }) => (
                <Textarea {...field} placeholder="Write in brief about the problem (e.g., Test Objective + Actual result vs. Expected result)" />
              )}
            />
            {errors.problemSummary && <p className="text-destructive">{errors.problemSummary.message}</p>}
          </div>

          <div className="col-span-2">
            <Label htmlFor="stepsToReproduce">How to Reproduce</Label>
            <Controller
              control={control}
              name="stepsToReproduce"
              render={({ field }) => (
                <Textarea {...field} placeholder="Detailed steps which the developer can reproduce the defects" />
              )}
            />
            {errors.stepsToReproduce && <p className="text-destructive">{errors.stepsToReproduce.message}</p>}
          </div>
          
          <div className="col-span-1">
            <Label htmlFor="severity">Severity</Label>
            <Controller
              control={control}
              name="severity"
              render={({ field }) => (
                <Select {...field}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Medium" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.severity && <p className="text-destructive">{errors.severity.message}</p>}
          </div>
          
          <div className="col-span-1">
            <Label htmlFor="priority">Priority</Label>
            <Controller
              control={control}
              name="priority"
              render={({ field }) => (
                <Select {...field}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Medium" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.priority && <p className="text-destructive">{errors.priority.message}</p>}
          </div>
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
