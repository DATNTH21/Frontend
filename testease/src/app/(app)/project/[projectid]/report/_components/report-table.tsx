import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import ActionCell from "./action-cell";
import { TReportSchema } from '../_data/schemas';

interface ReportTableProps {
  reports: TReportSchema[];
}

const ReportTable: React.FC<ReportTableProps> = ({ reports }) => {
  return (
    <Table className="border rounded-lg z-0">
      <TableHeader>
        <TableRow>
          <TableHead className="pl-4">ID</TableHead>
          <TableHead>REPORT TITLE</TableHead>
          <TableHead>REPORT TYPE</TableHead>
          <TableHead>REPORTED BY</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.length > 0 ? (
          reports.map((report) => (
            <TableRow key={report._id}>
              <TableCell className="pl-4">{report._id}</TableCell>
              <TableCell>{report.title}</TableCell>
              <TableCell>{report.type}</TableCell>
              <TableCell>{report.reportedBy}</TableCell>
              <TableCell className="text-right pr-4">
                <ActionCell report={report}/>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className='text-center'>
              No reports found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default ReportTable;