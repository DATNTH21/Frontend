'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParam = useSearchParams();
  const handleSearch = useDebouncedCallback((keyword: string) => {
    console.log(keyword);
    const params = new URLSearchParams(searchParam);
    if (keyword) {
      params.set('search', keyword);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200);
  return (
    <div className='relative flex-1'>
      <Search className='absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-50 w-4 h-14' />
      <Input
        placeholder='Search projects by title/ID'
        name='keyword'
        className='pl-10'
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParam.get('search')?.toString()}
      />
    </div>
  );
}
