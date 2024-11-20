import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
const AllProjectPage = async () => {
  // const cookieStore = await cookies();
  // const accessToken = cookieStore.get('accessToken')?.value;
  // const refreshToken = cookieStore.get('refreshToken')?.value;
  // if (!accessToken || !refreshToken) {
  //   return redirect('/login');
  // }

  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authenticate`, {
  //   method: 'GET',
  //   headers: {
  //     cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`
  //   }
  // });

  // if (!response.ok) {
  //   redirect('/login');
  // }
  return <div>This is all project page</div>;
};

export default AllProjectPage;
