import TestPieChart from "./_component/pie-chart";
import SummarySection from "./_component/summary";

export default function Dashboard() {
  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart Section */}
        <TestPieChart />

        {/* Summary Section */}
        <SummarySection />
      </div>
    </div>
  );
};
