import Image from "next/image"; 

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
            <Image src={"/assets/svg/dashboard.svg"} alt="Dashboard" width={24} height={24} />
            Dashboard
          </a>
          <a
            href='/project/[projectid]/blackbox-test'
            className='align-middle text-gray-700 hover:bg-blue-100 p-2 rounded flex flex-row'
          >
            <Image src={"/assets/svg/blackboxtest_icon.svg"} alt="BlackboxTest" width={24} height={24} />
            Black Box Testing
          </a>
          <a
            href='/project/[projectid]/unit-test'
            className='align-middle text-gray-700 hover:bg-blue-100 p-2 rounded flex flex-row'
          >
            <Image src={"/assets/svg/unittest_icon.svg"} alt="UnitTest" width={24} height={24} />
            Unit Testing
          </a>
          <a
            href='/project/[projectid]/report'
            className='align-middle text-gray-700 hover:bg-blue-100 p-2 rounded flex flex-row'
          >
            <Image src={"/assets/svg/report.svg"} alt="Report" width={24} height={24} />
            Report
          </a>
          <a href='/setting' className='align-middle text-gray-700 hover:bg-blue-100 p-2 rounded flex flex-row'>
            <Image src={"/assets/svg/setting.svg"} alt="Setting" width={24} height={24} />
            Setting
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
