'use client';

import { useCreateScenarios } from '@/api/scenario/scenario';
import { useTreeStore } from '@/store/tree-store';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useScenarioStore } from '@/store/scenario-store';
import { Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { getSocket } from '@/socket';
import { useProject } from '@/api/project/project';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { TCreateTestcases } from '../_data/schema';
import { useCreateTestcases } from '@/api/testcase/testcase';

const LoadingButton = ({ message }: { message: string }) => (
  <Button className='' variant='destructive' disabled>
    <Spinner variant='light' /> {message}
  </Button>
);

export default function GenerateTestCaseButton() {
  const { scenarioSelection } = useScenarioStore();
  const { checkedIds } = useTreeStore();

  const isUCSelected = checkedIds.size > 0;
  const isScenarioSelected = Object.keys(scenarioSelection).length > 0;

  const params = useParams<{ projectId: string; useCaseId: string; scenarioId: string }>();

  const { data: { data: project } = {} } = useProject(params.projectId);
  const isGeneratingScenarios = project ? project.status === 'Generating scenarios' : true;
  const isGeneratingTests = project ? project.status === 'Generating test cases' : true;

  // const { data: session } = useSession();
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = getSocket();

    socket.on('scenario-generated', (data) => {
      console.log('Received scenarios:', data);
      queryClient.invalidateQueries({ queryKey: ['project'] });
      queryClient.invalidateQueries({ queryKey: ['scenario'] });
    });
    socket.on('scenario-failed', (data) => {
      queryClient.invalidateQueries({ queryKey: ['project'] });
      queryClient.invalidateQueries({ queryKey: ['scenario'] });
      toast({
        variant: 'destructive',
        title: 'Generate scenarios failed',
        description: data.message
      });
    });

    socket.on('test-cases-generated', (data) => {
      console.log('Received testcases:', data);
      queryClient.invalidateQueries({ queryKey: ['project'] });
      queryClient.invalidateQueries({ queryKey: ['testcase'] });
      queryClient.invalidateQueries({ queryKey: ['scenario'] });
    });
    socket.on('test-cases-failed', (data) => {
      queryClient.invalidateQueries({ queryKey: ['project'] });
      queryClient.invalidateQueries({ queryKey: ['testcase'] });
      queryClient.invalidateQueries({ queryKey: ['scenario'] });
      toast({
        variant: 'destructive',
        title: 'Generate test cases failed',
        description: data.message
      });
    });
  }, []);

  const createScenariosMutation = useCreateScenarios({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project'] });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Create scenarios failed',
        description: error.message
      });
    }
  });

  const createTestcasesMutation = useCreateTestcases({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project'] });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Create test cases failed',
        description: error.message
      });
    }
  });

  function handleGenerateScenario() {
    const useCaseIds = Array.from(checkedIds);
    createScenariosMutation.mutate({ data: { use_case_ids: useCaseIds } });
  }

  function handleGenerateTestCase() {
    const genReq = [] as TCreateTestcases;
    const usecaseIds = Object.keys(scenarioSelection);
    for (const usecaseId of usecaseIds) {
      genReq.push({
        use_case_id: usecaseId,
        scenario_ids: Object.keys(scenarioSelection[usecaseId])
      });
    }
    console.log('Generating test cases:', genReq);
    createTestcasesMutation.mutate({ data: genReq });
    queryClient.invalidateQueries({ queryKey: ['project'] });
  }

  function handleClick() {
    if (isUCSelected && !isScenarioSelected) {
      handleGenerateScenario();
    } else if (isScenarioSelected) {
      handleGenerateTestCase();
    }
  }

  const getLoadingState = () => {
    if (!project?.status) return 'Generating...';
    if (isGeneratingScenarios) return 'Generating scenarios...';
    if (isGeneratingTests) return 'Generating test cases...';
    return null;
  };

  const loadingMessage = getLoadingState();
  if (loadingMessage) {
    return <LoadingButton message={loadingMessage} />;
  }

  return (
    <Button className='' variant='destructive' onClick={handleClick} disabled={!isUCSelected && !isScenarioSelected}>
      <Sparkles /> {isScenarioSelected ? 'Generate Test Case' : 'Generate Scenario'}
    </Button>
  );
}
