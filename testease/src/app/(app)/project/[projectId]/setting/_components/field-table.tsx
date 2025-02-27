import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import ActionCell from './action-cell';
import { TestCaseConfigOption } from '@/types/user-config';

interface FieldTableProps {
  fields: Record<string, TestCaseConfigOption[]>;
}

const FieldTable: React.FC<FieldTableProps> = ({ fields }) => {
  const fieldKeys = Object.keys(fields);
  return (
    <div className='border rounded-lg'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='pl-4 w-[480px]'>FIELDS</TableHead>
            <TableHead className='text-right'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fieldKeys.length > 0 ? (
            fieldKeys.map((fieldKey) => (
              <TableRow key={fieldKey}>
                <TableCell className='pl-4'>
                  <div className='font-semibold capitalize'>{fieldKey}</div>
                  <div className='flex'>{fields[fieldKey].map((option) => option.name).join(', ')}</div>
                </TableCell>
                <TableCell className='text-right pr-4'>
                  <ActionCell field={fields[fieldKey]} fieldKey={fieldKey} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className='text-center'>
                No field found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FieldTable;
