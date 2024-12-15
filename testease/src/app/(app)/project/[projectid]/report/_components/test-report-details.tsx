import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { TTestReportSchema } from "../_data/schemas";
import { Label } from "@/components/ui/label";

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 pb-2">
      <Label className="font-medium text-sm text-muted-foreground">{label}</Label>
      <p className="text-sm text-primary">{value}</p>
    </div>
  );
}

export default function TestReportDetails({ report } : {report: TTestReportSchema }) {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Test Report</SheetTitle>
        <SheetDescription>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
            <Detail label="ID:" value={report._id} />
            <Detail label="Type:" value={report.type} />
            <div className="flex justify-between gap-4 pb-2 md:col-span-2">
              <Label className="font-medium text-sm text-muted-foreground">Title:</Label>
              <p className="text-sm text-primary">{report.title}</p>
            </div>
            <div className="flex justify-between gap-4 pb-2 md:col-span-2">
              <Label className="font-medium text-sm text-muted-foreground">Project:</Label>
              <p className="text-sm text-primary">{report.project}</p>
            </div>
            <div className="flex justify-between gap-4 pb-2 md:col-span-2">
              <Label className="font-medium text-sm text-muted-foreground">Function Name:</Label>
              <p className="text-sm text-primary">{report.functionName}</p>
            </div>
            <div className="flex justify-between gap-4 pb-2 md:col-span-2">
              <Label className="font-medium text-sm text-muted-foreground">Reported By:</Label>
              <p className="text-sm text-primary">{report.reportedBy}</p>
            </div>
            <div className="md:col-span-2">
              <Label className="font-semibold mb-3">Test Summary</Label>
              <p className="text-sm text-primary">{report.testSummary}</p>
            </div>
            <div className="md:col-span-2">
              <Label className="font-semibold mb-3">Test Results</Label>
              <p className="text-sm text-primary">{report.testResults}</p>
            </div>
          </div>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  )
}