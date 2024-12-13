import { Skeleton } from '@/components/ui/skeleton';

export default function SidebarFooterSkeleton() {
  return (
    <div className='flex items-center gap-1 h-12 w-full rounded-lg'>
      <Skeleton className='rounded-lg bg-primary h-8 w-8'></Skeleton>
      <Skeleton className='w-full h-4 flex-1 bg-gray-500'></Skeleton>
    </div>
  );
}
