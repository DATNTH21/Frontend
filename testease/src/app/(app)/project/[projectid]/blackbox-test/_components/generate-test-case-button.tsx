'use client';

import { useCreateScenarios } from '@/api/scenario/scenario';
import { useTreeStore } from '@/store/tree-store';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useScenarioStore } from '@/store/scenario-store';
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { disconnectSocket, getSocket, initializeSocket } from '@/socket';
import { useSession } from 'next-auth/react';
import { useProject } from '@/api/project/project';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

export default function GenerateTestCaseButton() {
  const { scenarioSelection } = useScenarioStore();
  const { checkedIds } = useTreeStore();

  const isUCSelected = checkedIds.size > 0;
  const isScenarioSelected = Object.keys(scenarioSelection).length > 0;

  const params = useParams<{ projectId: string; useCaseId: string; scenarioId: string }>();
  const { data: { data: project } = {} } = useProject(params.projectId);
  const [isGenerating, setIsGenerating] = useState(true);
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (session?.user) {
      initializeSocket(session?.user.id);
      const socket = getSocket();

      socket.on('scenario-generated', (data) => {
        console.log('Received scenarios:', data);
        setIsGenerating(false);
        queryClient.invalidateQueries({ queryKey: ['project'] });
        queryClient.invalidateQueries({ queryKey: ['scenario'] });
      });
    }
    return () => {
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    if (project) {
      setIsGenerating(project.status === 'Generating');
    }
  }, [project]);

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
    setIsGenerating(true);
    queryClient.invalidateQueries({ queryKey: ['project'] });
  }

  if (isGenerating) {
    return (
      <Button className='' variant='destructive' disabled>
        <Spinner /> Generating {isScenarioSelected ? 'Test Case' : isUCSelected ? 'Scenario' : ''} ...
      </Button>
    );
  }

  return (
    <Button
      className=''
      variant='destructive'
      onClick={handleGenerateTestCase}
      disabled={!isUCSelected && !isScenarioSelected}
    >
      <Sparkles /> {isScenarioSelected ? 'Generate Test Case' : 'Generate Scenario'}
    </Button>
  );
}
