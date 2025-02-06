import React from 'react';
import FieldTable from './field-table';
import CreateFieldForm from './create-field-dialog';
import TestCaseExportConfiguration from './test-case-export-configuration';

const TestRunField: React.FC = () => {
  //Fetch value there
  const testRunFields = [
    {
      _id: 'TR-1',
      field: 'Test Status',
      values: ['Blocked', 'Failed', 'In Progress', 'Passed', 'Retest', 'Skipped', 'Untested'],
      project: 'Project 1',
      type: 'System'
    }
  ];

  const handleCreateField = (newField: { field: string; values: string[]; project: string; type: string }) => {
    console.log('New field created:', newField);
  };

  return (
    <div>
      <div className='flex sticky top-0 bg-background h-16 shrink-0 items-center px-4 justify-between'>
        <div>Configure your test case export structure here:</div>
      </div>
      <div className='p-4'>
        <TestCaseExportConfiguration />
      </div>
    </div>
  );
};

export default TestRunField;
