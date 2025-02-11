import { getProjectStatistics } from '@/api/project/project';
import TestPieChart from './_component/pie-chart';
import SummarySection from './_component/summary';

export default async function Dashboard({ params }: { params: Promise<{ projectId: string }> }) {
  const projectId = (await params).projectId;
  const statistics = (await getProjectStatistics(projectId)).data;

  return (
    <div className='p-8 min-h-screen'>
      <h1 className='text-2xl font-bold mb-8'>Dashboard</h1>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Pie Chart Section */}
        <TestPieChart statistics={statistics} />

        {/* Summary Section */}
        <SummarySection statistics={statistics} />
      </div>
    </div>
  );
}
