import CreateBugReport from "./_components/create-bug-report"
import CreateSummaryReport from "./_components/create-summary-report"

export default function ReportPage() {
  return (
    <div className="p-4">
      <div>
        Explore reports by clicking on any of the below templates
      </div>
      <div className="flex gap-4 p-4">
        <CreateBugReport />
        <CreateSummaryReport />
      </div>
    </div>
  )
};