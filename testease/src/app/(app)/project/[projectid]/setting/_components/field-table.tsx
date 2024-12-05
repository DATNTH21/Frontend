import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import ActionCell from "./actionCell";

interface Field {
  id: string,
  field: string;
  values: string[];
  project: string;
  type: string;
}

interface FieldTableProps {
  fields: Field[];
}

const FieldTable: React.FC<FieldTableProps> = ({ fields }) => {
  return (
    <Table className="border rounded-lg z-0">
      <TableHeader>
        <TableRow>
          <TableHead className="pl-4 w-[480px]">FIELDS</TableHead>
          <TableHead>PROJECT</TableHead>
          <TableHead>TYPE</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fields.length > 0 ? (
          fields.map((field) => (
            <TableRow key={field.id}>
              <TableCell className="pl-4">
                <div>{field.field}</div>
                <div className="flex">
                  {field.values.map((value) => (
                    <div key={value}>{value}&nbsp;</div>
                  ))}
                </div>
              </TableCell>
              <TableCell>{field.project}</TableCell>
              <TableCell>{field.type}</TableCell>
              <TableCell className="text-right pr-4">
                <ActionCell field={field}/>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className='text-center'>
              No test run fields found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default FieldTable;