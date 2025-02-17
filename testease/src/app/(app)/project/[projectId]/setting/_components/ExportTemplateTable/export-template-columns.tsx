'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ExampleTestCaseData, TestCaseExportColumn } from '@/types/user-config';
import { Input } from '@/components/ui/input';
import { Dispatch, SetStateAction } from 'react';

export const ExportTemplateColumns = (
  template: TestCaseExportColumn[],
  columnDisplayName: Record<string, string>,
  setColumnDisplayName: Dispatch<SetStateAction<Record<string, string>>>
): ColumnDef<ExampleTestCaseData>[] => {
  return template.map((column) => ({
    accessorKey: column.fieldKey,
    id: column.fieldKey,
    header: () => (
      <div className='flex flex-col items-center space-y-2 py-2'>
        <div className='flex gap-1 items-center'>
          <span>{column.fieldKey}</span>
        </div>
        <Input
          type='text'
          value={columnDisplayName[column.fieldKey]}
          className='border rounded-md'
          onChange={(e) => {
            setColumnDisplayName((prevState) => ({
              ...prevState,
              [column.fieldKey]: e.target.value
            }));
          }}
        />
      </div>
    ),
    cell: ({ row }) =>
      column.fieldKey == 'steps' ? (
        <div className='overflow-hidden text-ellipsis'>
          {row.original['steps']?.map((step, index) => (
            <p className='' key={index}>
              {index + 1}. {''}
              {step}
            </p>
          ))}
        </div>
      ) : (
        <div className='overflow-hidden text-ellipsis'>
          {row.original[column.fieldKey as keyof ExampleTestCaseData]}
        </div>
      )
  }));
};
