import Image from 'next/image';

const AllProjectPage = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='grid grid-cols-2'>
      <div className='col-span-1 p-40'>
        <Image src={"/assets/svg/login.svg"} width={400} height={400} alt="login picture"/>
      </div>
      {children}
    </div>
  );
};

export default AllProjectPage;
