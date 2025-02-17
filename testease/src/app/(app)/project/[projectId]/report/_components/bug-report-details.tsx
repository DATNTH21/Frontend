import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { TBugReportSchema } from '../_data/schemas';
import { Label } from '@/components/ui/label';

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex justify-between gap-4 pb-2'>
      <Label className='font-medium text-sm text-muted-foreground'>{label}</Label>
      <p className='text-sm text-primary'>{value}</p>
    </div>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function BugReportDetails({ report }: { report: TBugReportSchema }) {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className='text-xl font-bold mb-2'>Bug/Defect Report Details</SheetTitle>
        <SheetDescription>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8'>
            <Detail label='ID:' value={report._id} />
            <Detail label='Type:' value={report.type} />
            <div className='flex justify-between gap-4 pb-2 md:col-span-2'>
              <Label className='font-medium text-sm text-muted-foreground'>Title:</Label>
              <p className='text-sm text-primary'>{report.title}</p>
            </div>
            <div className='flex justify-between gap-4 pb-2 md:col-span-2'>
              <Label className='font-medium text-sm text-muted-foreground'>Project:</Label>
              <p className='text-sm text-primary'>{report.project}</p>
            </div>
            <div className='flex justify-between gap-4 pb-2 md:col-span-2'>
              <Label className='font-medium text-sm text-muted-foreground'>Function Name:</Label>
              <p className='text-sm text-primary'>{report.functionName}</p>
            </div>
            <Detail label='Bug ID:' value={report.bugId} />
            <Detail label='Status:' value={capitalize(report.status)} />
            <Detail label='Reported By:' value={report.reportedBy} />
            <Detail label='Assign To:' value={report.assignTo || 'Unassigned'} />
            <Detail label='Severity:' value={capitalize(report.severity)} />
            <Detail label='Priority:' value={capitalize(report.priority)} />
            <div className='md:col-span-2'>
              <Label className='font-semibold mb-3'>Problem Summary:</Label>
              <p className='text-sm text-primary'>{report.problemSummary}</p>
            </div>
            <div className='md:col-span-2'>
              <Label className='font-semibold mb-3'>Steps to Reproduce:</Label>
              <p className='text-sm text-primary'>{report.stepsToReproduce}</p>
            </div>
          </div>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
}
