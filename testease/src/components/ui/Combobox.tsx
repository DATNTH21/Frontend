'use client';

import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Updater } from '@tanstack/react-table';

interface ComboboxProps {
  updateValFunc: (updater: Updater<number>) => void;
}

const itemsList = Array.from({ length: 5 }, (_, i) => ({
  value: String(10 * (i + 1)),
  label: 10 * (i + 1)
}));

export function Combobox({ updateValFunc }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<String>(itemsList[0].value);

  const handleSelect = (currentValue: String) => {
    if (currentValue !== value) {
      updateValFunc(Number(currentValue));
      setValue(currentValue);
    }
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' role='combobox' aria-expanded={open} className='w-[70px] justify-between'>
          <span style={{ pointerEvents: 'none' }} className='font-normal'>
            {value ? itemsList.find((item) => item.value === value)?.label : itemsList[0].label}
          </span>
          <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[140px] p-0' align='start'>
        <Command>
          <CommandList>
            <CommandGroup>
              {itemsList.map((item) => (
                <CommandItem key={item.value} value={item.value} onSelect={handleSelect}>
                  <Check className={cn('mr-2 h-4 w-4', value === item.value ? 'opacity-100' : 'opacity-0')} />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
