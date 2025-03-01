import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TestCaseField from './_components/testcase-field';
import { FolderCode, LayoutPanelTop } from 'lucide-react';
import TestCaseExportConfiguration from './_components/test-case-export-configuration';

export default function SettingPage() {
  return (
    <Tabs defaultValue='testCase' className='p-4 w-full mb-12'>
      <div className='w-full border-b relative'>
        <TabsList className='relative p-0 flex h-fit w-fit'>
          <TabsTrigger
            value='testCase'
            className='group relative py-4 px-8 bg-background text-foreground rounded-none data-[state=active]:shadow-none 
                  data-[state=active]:text-sidebar-active data-[state=active]:font-bold'
          >
            <FolderCode />
            &nbsp;Test Case Fields
            {/* Active Indicator */}
            <span
              className='absolute bottom-0 left-0 h-[2px] bg-primary w-full scale-x-0 transition-all duration-300 ease-in-out 
              group-data-[state=active]:scale-x-100'
            ></span>
          </TabsTrigger>

          <TabsTrigger
            value='testCaseExport'
            className='group relative py-4 px-8 bg-background text-foreground rounded-none data-[state=active]:shadow-none 
                  data-[state=active]:text-sidebar-active data-[state=active]:font-bold'
          >
            <LayoutPanelTop />
            &nbsp;Test Case Export Template
            {/* Active Indicator */}
            <span
              className='absolute bottom-0 left-0 h-[2px] bg-primary w-full scale-x-0 transition-all duration-300 ease-in-out 
              group-data-[state=active]:scale-x-100'
            ></span>
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value='testCase'>
        <TestCaseField />
      </TabsContent>
      <TabsContent value='testCaseExport'>
        <TestCaseExportConfiguration />
      </TabsContent>
    </Tabs>
  );
}
