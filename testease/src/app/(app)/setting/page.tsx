'use client';
import { getUser } from '@/api/auth/auth';
import Sidebar from '@/components/layouts/sidebar';

const SettingPage = () => {
  // const response = await getUser();
  // console.log(response);
  return (
    <div className='flex min-h-screen'>
      {/* Sidebar */}
      <Sidebar />
      This is Setting
    </div>
  );
};

export default SettingPage;
