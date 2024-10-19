import Image from 'next/image';

const AllProjectPage = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='tablet:grid tablet:grid-cols-2'>
      <div className='tablet:col-span-1 p-16 tablet:p-24 laptop:p-40 desktop:p-80'>
        <Image src={"/assets/svg/login.svg"} width={800} height={800} alt="login picture"/>
      </div>
      {children}
    </div>
  );
};

export default AllProjectPage;
