import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";

interface Field {
  id: string;
  field: string;
  values: string[];
  project: string;
  type: string;
}

interface EditFieldFormProps {
  field: Field;
  onSave: (updatedField: Field) => void;
}

const EditFieldForm: React.FC<EditFieldFormProps> = ({ field, onSave }) => {
  const [formValues, setFormValues] = useState({
    field: field.field,
    values: field.values.join(", "),
    type: field.type,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedField: Field = {
      ...field,
      field: formValues.field,
      values: formValues.values.split(",").map((val) => val.trim()),
      type: formValues.type,
    };
    onSave(updatedField);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit text-left bg-background hover:bg-card">
          <Edit className="h-4 w-4 mr-2 text-foreground" />
          <Label className="text-foreground">Configure</Label>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Field</DialogTitle>
          <DialogDescription>
            Make changes to the field. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="field" className="text-right">
              Field Name
            </Label>
            <Input
              name="field"
              value={formValues.field}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="values" className="text-right">
              Values
            </Label>
            <Input
              name="values"
              value={formValues.values}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Input
              name="type"
              value={formValues.type}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditFieldForm;
