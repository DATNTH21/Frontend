import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import ActionCell from './action-cell';
import { TFieldSchema } from '../_data/schemas';

interface FieldTableProps {
  fields: TFieldSchema[];
}

const FieldTable: React.FC<FieldTableProps> = ({ fields }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='pl-4 w-[480px]'>FIELDS</TableHead>
          <TableHead className='text-right'></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fields.length > 0 ? (
          fields.map((field) => (
            <TableRow key={field._id}>
              <TableCell className='pl-4'>
                <div>{field.field}</div>
                <div className='flex'>
                  {field.values.map((value) => (
                    <div key={value}>{value}&nbsp;</div>
                  ))}
                </div>
              </TableCell>
              <TableCell className='text-right pr-4'>
                <ActionCell field={field} />
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
  );
};

export default FieldTable;
