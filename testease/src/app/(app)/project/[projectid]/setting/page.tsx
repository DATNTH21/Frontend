import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TestCaseField from './_components/testcase-field';
import TestRunField from './_components/testrun-field';
import { FolderCode, SquareCode } from 'lucide-react';

const SettingPage = () => {
  return (
    <Tabs defaultValue='testcase' className='p-4 w-full'>
      <TabsList className='grid w-[380px] grid-cols-2'>
        <TabsTrigger value='testcase'>
          <FolderCode />
          &nbsp;Test Case Fields
        </TabsTrigger>
        <TabsTrigger value='testrun'>
          <SquareCode />
          &nbsp;Test Run Fields
        </TabsTrigger>
      </TabsList>
      <TabsContent value='testcase'>
        <TestCaseField />
      </TabsContent>
      <TabsContent value='testrun'>
        <TestRunField />
      </TabsContent>
    </Tabs>
  );
};

export default SettingPage;
