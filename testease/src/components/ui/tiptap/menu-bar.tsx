'use client';
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';
import { Button } from '../button';
import { Redo, Undo } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { cn } from '@/utils/cn';
import { useCurrentEditor } from '@tiptap/react';

export default function MenuBar() {
  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }
  return (
    <div className='flex gap-1'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='ghost' size='icon'>
              <Undo />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Undo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='ghost' size='icon'>
              <Redo />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Redo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Select>
        <SelectTrigger className='w-[100px] border-none focus:ring-0'>
          <SelectValue placeholder='Heading' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            value='h1'
            className={cn('cursor-pointer', editor.isActive('heading', { level: 2 }) ? 'is-active' : '')}
          >
            H1
          </SelectItem>
          <SelectItem
            value='h2'
            className={cn('cursor-pointer', editor.isActive('heading', { level: 1 }) ? 'is-active' : '')}
          >
            H2
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
