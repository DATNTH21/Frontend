import CreateBugReport from "./_components/create-bug-report"
import CreateTestReport from "./_components/create-test-report"
import ReportTable from "./_components/report-table";
import { TReportSchema } from "./_data/schemas";

export default function ReportPage() {
  const data: TReportSchema[] = [
    {
      _id: "1",
      title: "Login button not working",
      type: "Bug Report",
      project: "Authentication Module",
      bugId: "BUG-001",
      reportedBy: "Alice",
      assignTo: "John",
      status: "open",
      functionName: "handleLoginClick",
      problemSummary: "The login button is unresponsive on click.",
      stepsToReproduce: "1. Open the login page. 2. Enter valid credentials. 3. Click the login button.",
      severity: "high",
      priority: "high",
    },
    {
      _id: "2",
      title: "UI crashes on page reload",
      type: "Bug Report",
      project: "UI Module",
      bugId: "BUG-002",
      reportedBy: "Bob",
      assignTo: "Jane",
      status: "in-progress",
      functionName: "loadUserProfile",
      problemSummary: "Reloading the user profile page crashes the UI.",
      stepsToReproduce: "1. Navigate to the profile page. 2. Press F5 to refresh the page.",
      severity: "medium",
      priority: "high",
    },
    {
      _id: "3",
      title: "Payment feature test case",
      type: "Test Report",
      project: "Payment Module",
      functionName: "processPayment",
      testSummary: "Test case to validate the payment process for various payment methods.",
      testResults: "All test cases passed successfully, except for invalid card handling.",
      reportedBy: "Charlie",
    },
    {
      _id: "4",
      title: "Registration form validation",
      type: "Test Report",
      project: "User Management Module",
      functionName: "validateRegistration",
      testSummary: "Testing validation rules for user registration form.",
      testResults: "Validation failed for phone number format. Other cases passed.",
      reportedBy: "Alice",
    },
    {
      _id: "5",
      title: "Profile image upload bug",
      type: "Bug Report",
      project: "Profile Module",
      bugId: "BUG-003",
      reportedBy: "Dave",
      assignTo: "Mike",
      status: "closed",
      functionName: "uploadProfileImage",
      problemSummary: "Uploading profile images results in a 500 server error.",
      stepsToReproduce: "1. Go to profile settings. 2. Select an image file. 3. Click upload.",
      severity: "high",
      priority: "medium",
    },
    {
      _id: "6",
      title: "API integration test results",
      type: "Test Report",
      project: "API Gateway Module",
      functionName: "getOrders",
      testSummary: "Testing the integration of the orders API with the frontend.",
      testResults: "API returned correct responses for valid inputs. Timeout errors occurred for large payloads.",
      reportedBy: "Charlie",
    },
  ];
  
  
  return (
    <div className="p-4">
      <div>
        Explore reports by clicking on any of the below templates
      </div>
      <div className="flex gap-4 p-4">
        <CreateBugReport />
        <CreateTestReport />
      </div>
      <div>
        <ReportTable reports={data}/>
      </div>
    </div>
  )
};