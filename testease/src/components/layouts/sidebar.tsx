import { paths } from '@/lib/routes';
import Image from 'next/image';
import Link from 'next/link';

interface SidebarMenuItem {
  icon: string;
  href: string;
  label: string;
}

const Sidebar = ({ projectId }: { projectId: string }) => {
  const sidebarMenu: SidebarMenuItem[] = [
    {
      icon: '/svg/dashboard.svg',
      href: paths.projectDetail.dashboard.getHref(projectId),
      label: 'Dashboard'
    },
    {
      icon: '/svg/blackboxtest_icon.svg',
      href: paths.projectDetail.blackboxTest.getHref(projectId),
      label: 'Blackbox test'
    },
    {
      icon: '/svg/unittest_icon.svg',
      href: paths.projectDetail.unitTest.getHref(projectId),
      label: 'Unit test'
    },
    {
      icon: '/svg/report.svg',
      href: paths.projectDetail.report.getHref(projectId),
      label: 'Report'
    }
  ];
  return (
    <div className={`bg-gray-100 'w-64' transition-all duration-300`}>
      <div className='p-4'>
        <h2 className='text-xl font-bold'>Demo Project</h2>
      </div>
      <nav className='flex flex-col space-y-4 p-4'>
        {sidebarMenu.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className='align-middle text-gray-700 hover:bg-blue-100 p-2 rounded flex flex-row'
          >
            <Image src={item.icon} alt={item.label} width={24} height={24} />
            <span className='ml-2'>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
