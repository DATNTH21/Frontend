import { Skeleton } from '@/components/ui/skeleton';

export default function SidebarFooterSkeleton() {
  return (
    <div className='flex gap-1'>
      <Skeleton className='h-8 w-8 rounded-lg'></Skeleton>
      <Skeleton className='h-full w-full'></Skeleton>
    </div>
  );
}
