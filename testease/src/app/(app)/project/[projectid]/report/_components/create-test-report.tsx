'use client'

import React, { useState } from "react";
import { SquareCode } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { TCreateTestReportSchema, CreateTestReportSchema } from "../_data/schemas";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function CreateTestReport() {
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TCreateTestReportSchema>({ resolver: zodResolver(CreateTestReportSchema) });

  const onSubmit = (data: TCreateTestReportSchema) => {
    console.log("Create field data:", data);
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-row flex-1 gap-4 border border-gray-300 rounded-lg p-4 cursor-pointer hover:shadow-md">
          <div className="flex-shrink-0 mt-auto mb-auto">
            <SquareCode size={36} />
          </div>
          <div>
            <h3 className="font-semibold">Test Summary Report</h3>
            <p className="text-sm text-gray-500">
              Provides summarizing test activities and results
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-max">
        <DialogHeader>
          <DialogTitle>Create Test Summary Report</DialogTitle>
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
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" form="create-test-report-form" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
