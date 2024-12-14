import React from "react";
import FieldTable from "./field-table";
import CreateFieldForm from "./create-field-dialog";

const TestCaseField: React.FC = () => {
  //Fetch value there
  const testCaseFields = [
    { _id: "TC-1", field: "Priority", project: "All Projects", type: "System", values: ["Critical", "High", "Low", "Medium"] },
    { _id: "TC-2", field: "Severity", project: "All Projects", type: "System", values: ["Fatal", "Serious", "Medium"] },
    { _id: "TC-3", field: "Priority", project: "All Projects", type: "System", values: ["Critical", "High", "Low", "Medium"] },
    { _id: "TC-4", field: "Severity", project: "All Projects", type: "System", values: ["Fatal", "Serious", "Medium"] },
    { _id: "TC-5", field: "Priority", project: "All Projects", type: "System", values: ["Critical", "High", "Low", "Medium"] },
    { _id: "TC-6", field: "Severity", project: "All Projects", type: "System", values: ["Fatal", "Serious", "Medium"] },
    { _id: "TC-7", field: "Priority", project: "All Projects", type: "System", values: ["Critical", "High", "Low", "Medium"] },
    { _id: "TC-8", field: "Severity", project: "All Projects", type: "System", values: ["Fatal", "Serious", "Medium"] },
    { _id: "TC-9", field: "Priority", project: "All Projects", type: "System", values: ["Critical", "High", "Low", "Medium"] },
    { _id: "TC-10", field: "Severity", project: "All Projects", type: "System", values: ["Fatal", "Serious", "Medium"] },
    { _id: "TC-11", field: "Priority", project: "All Projects", type: "System", values: ["Critical", "High", "Low", "Medium"] },
    { _id: "TC-12", field: "Severity", project: "All Projects", type: "System", values: ["Fatal", "Serious", "Medium"] },
    { _id: "TC-13", field: "Priority", project: "All Projects", type: "System", values: ["Critical", "High", "Low", "Medium"] },
    { _id: "TC-14", field: "Severity", project: "All Projects", type: "System", values: ["Fatal", "Serious", "Medium"] },
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