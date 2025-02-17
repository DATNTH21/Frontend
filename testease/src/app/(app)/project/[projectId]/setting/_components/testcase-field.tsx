'use client';
import React from 'react';
import FieldTable from './field-table';
import { useUserConfig } from '@/api/user-config/user-config';

const TestCaseField: React.FC = () => {
  const { data: userConfigResponse, status } = useUserConfig();

  return (
    <>
      <div className='flex sticky top-0 bg-background h-16 shrink-0 items-center px-4 justify-between'>
        <div>Select a test case field below to configure:</div>
      </div>
      {status == 'success' && (
        <FieldTable
          fields={{ priority: userConfigResponse.data?.priority || [], status: userConfigResponse.data?.status || [] }}
        />
      )}
    </>
  );
};

export default TestCaseField;
