'use client';

import { useUserConfig } from '@/api/user-config/user-config';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { FileDown } from 'lucide-react';
import { useState } from 'react';
import wretch from 'wretch';
import { saveAs } from 'file-saver';
import { Spinner } from '@/components/ui/spinner';
import { useTestCasesOfProject } from '@/api/testcase/testcase';
import { useParams } from 'next/navigation';

export default function ExportAllTestCaseButton() {
  const projectId = useParams<{ projectId: string }>().projectId;
  const [isExporting, setExporting] = useState(false);
  const { data: allTestCasesOfProjectResponse } = useTestCasesOfProject(projectId);
  const exportTemplate = useUserConfig().data?.data?.testCaseExportTemplate || [];
  const allTestCasesOfProject = allTestCasesOfProjectResponse?.data;

  const handleExportAllTestCases = async () => {
    setExporting(true);

    if (!allTestCasesOfProject || allTestCasesOfProject.length == 0) {
      toast({
        variant: 'destructive',
        title: 'Fail To Export Test Case',
        description: 'No test case found'
      });
      setExporting(false);
      return;
    }

    if (!exportTemplate || exportTemplate.length == 0) {
      toast({
        variant: 'destructive',
        title: 'Fail To Export Test Case',
        description: 'No export template. Please config the template in the setting'
      });
      setExporting(false);
      return;
    }

    try {
      const response = wretch('/api/export-test-cases')
        .headers({
          Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        .post({ testCases: allTestCasesOfProject, template: exportTemplate });

      const blob = await response.blob();
      saveAs(blob, 'Test_Cases.xlsx');
      toast({
        variant: 'success',
        title: 'Test Cases downloaded'
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Fail To Export Test Case',
        description: 'Something went wrong'
      });
      setExporting(false);
    } finally {
      setExporting(false);
    }
  };
  return (
    <Button className='bg-teal-600 hover:bg-teal-600/80' onClick={handleExportAllTestCases} disabled={isExporting}>
      {isExporting ? <Spinner variant='light' /> : <FileDown />}
      {isExporting ? 'Exporting...' : 'Export All Test Cases'}
    </Button>
  );
}
