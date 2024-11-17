import auth from '@/app/_service/auth';

const AllProjectPage = async () => {
  const user = await auth();
  console.log(user);

  return <div>This is all project page</div>;
};

export default AllProjectPage;
