import { DashboardIcon, BlackBoxTestIcon, UnitTestIcon, ReportIcon, SettingIcon } from '@/assets/svg';

const Sidebar = () => {
  return (
    <div>
      <div className={`bg-gray-100 'w-64' transition-all duration-300`}>
        <div className='p-4'>
          <h2 className='text-xl font-bold'>Demo Project</h2>
        </div>
        <nav className='flex flex-col space-y-4 p-4'>
          <a
            href='/project/[projectid]/dashboard'
            className='align-middle text-gray-700 hover:bg-blue-100 p-2 rounded flex flex-row'
          >
            <DashboardIcon className='w-6 h-6' />
            Dashboard
          </a>
          <a
            href='/project/[projectid]/blackbox-test'
            className='align-middle text-gray-700 hover:bg-blue-100 p-2 rounded flex flex-row'
          >
            <BlackBoxTestIcon className='w-6 h-6' />
            Black Box Testing
          </a>
          <a
            href='/project/[projectid]/unit-test'
            className='align-middle text-gray-700 hover:bg-blue-100 p-2 rounded flex flex-row'
          >
            <UnitTestIcon className='w-6 h-6' />
            Unit Testing
          </a>
          <a
            href='/project/[projectid]/report'
            className='align-middle text-gray-700 hover:bg-blue-100 p-2 rounded flex flex-row'
          >
            <ReportIcon className='w-6 h-6' />
            Report
          </a>
          <a href='/setting' className='align-middle text-gray-700 hover:bg-blue-100 p-2 rounded flex flex-row'>
            <SettingIcon className='w-6 h-6' />
            Setting
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
