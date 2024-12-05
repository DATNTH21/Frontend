import React from "react";
import { Button } from "@/components/ui/button";
import FieldTable from "./field-table";
import CreateFieldForm from "./createForm";

const TestCaseField: React.FC = () => {
  //Fetch value there
  const testCaseFields = [
    { id: "TC-1", field: "Priority", project: "All Projects", type: "System", values: ["Critical", "High", "Low", "Medium"] },
    { id: "TC-2", field: "Severity", project: "All Projects", type: "System", values: ["Fatal", "Serious", "Medium"] },
  ];

  return (
    <div>
      <div className="flex sticky top-0 bg-background h-16 shrink-0 items-center border-b px-4 justify-between">
        <div>
          Select a test case field below to configure:
        </div>
        <CreateFieldForm type={"testCase"}/>
      </div>
      <div className="p-4">
        <FieldTable fields={testCaseFields}/>
      </div>
    </div>
  )
}

export default TestCaseField;