'use client';

import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function GenerateTestCaseButton() {
  return (
    <Button className='' variant='destructive'>
      <Sparkles /> Generate Test Case
    </Button>
  );
}
