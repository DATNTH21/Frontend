'use client'

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditFieldFormProps {
  type: "testCase" | "testRun";
}

const CreateFieldForm: React.FC<EditFieldFormProps> = ({ type }) => {
  const [fieldName, setFieldName] = useState("");
  const [fieldValues, setFieldValues] = useState("");
  const [project, setProject] = useState("All projects"); // Default value
  const [fieldType, setFieldType] = useState("");

  const onCreate = (newField: { field: string; values: string[]; project: string; type: string;}) => {
    console.log('New field created:', newField);
  };

  const handleSubmit = () => {
    if (!fieldName.trim() || !fieldType.trim()) {
      alert("Field name and type are required.");
      return;
    }

    console.log(type);

    const valuesArray = fieldValues?.split(",").map((val) => val.trim());
    onCreate({ field: fieldName, values: valuesArray, project, type: fieldType });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white hover:bg-blue-600">
          Create Field
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Field</DialogTitle>
          <DialogDescription>
            Fill out the details below to create a new field. Click "Create" when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fieldName" className="text-right">
              Field Name
            </Label>
            <Input
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fieldValues" className="text-right">
              Values
            </Label>
            <Input
              value={fieldValues}
              onChange={(e) => setFieldValues(e.target.value)}
              placeholder="Comma-separated values"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="project" className="text-right">
              Project
            </Label>
            <Input
              value={project}
              onChange={(e) => setProject(e.target.value)}
              placeholder="All projects"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fieldType" className="text-right">
              Field Type
            </Label>
            <Input
              value={fieldType}
              onChange={(e) => setFieldType(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} className="bg-blue-500 text-white hover:bg-blue-600">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFieldForm;
