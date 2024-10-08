import { LoginPicture } from '@/assets/svg';

const AllProjectPage = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='grid grid-cols-2'>
      <LoginPicture className='col-span-1 p-40' />
      {children}
    </div>
  );
};

export default AllProjectPage;
