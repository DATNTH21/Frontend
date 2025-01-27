//Landing page here

import Tiptap from '@/components/ui/tiptap/tiptap';
import { customFetch } from '@/lib/api-client';

type Response = {
  message: string;
};

export default async function Home() {
  const data = await customFetch.get<Response>('/file', { useNextApi: true });
  return (
    <div className='flex flex-col gap-4 max-w-screen-lg'>
      {data ? <p>{data.message}</p> : <p>Nothing</p>}
      <Tiptap></Tiptap>
    </div>
  );
}
