'use client';

import { useCreateScenarios } from '@/api/scenario/scenario';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useTreeStore } from '@/store/tree-store';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function GenerateTestCaseButton() {
  const { checkedIds } = useTreeStore();
  // const [isGenerating, setIsGenerating] = useState(false);

  const createScenariosMutation = useCreateScenarios({
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Create scenarios failed',
        description: error.message
      });
    }
  });

  // indeed generate scenarios first
  function handleGenerateTestCase() {
    if (checkedIds.size === 0) return;
    const useCaseIds = Array.from(checkedIds);
    createScenariosMutation.mutate({ data: { use_case_ids: useCaseIds } });
  }
  return (
    <Button className='' variant='destructive' onClick={handleGenerateTestCase}>
      <Sparkles /> Generate Test Case
    </Button>
  );
}
