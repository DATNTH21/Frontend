import { Spinner } from '@/components/ui/spinner';
import { ArrowDown, ArrowRight, ArrowUp, CheckCircle, CircleOff, Timer } from 'lucide-react';

export const testCaseStatuses = [
  {
    value: 'in progress',
    label: 'In Progress',
    color: '#1E90FF',
    icon: Timer
  },
  {
    value: 'passed',
    label: 'Passed',
    color: '#37b24d',
    icon: CheckCircle
  },
  {
    value: 'failed',
    label: 'Failed',
    color: '#f03e3e',
    icon: CircleOff
  }
];

export const testCasePriorities = [
  {
    label: 'Low',
    value: 'Low',
    icon: ArrowDown
  },
  {
    label: 'Medium',
    value: 'Medium',
    icon: ArrowRight
  },
  {
    label: 'High',
    value: 'High',
    icon: ArrowUp
  }
];

export const scenarioStatus = [
  {
    label: 'GENERATING',
    value: 'generating',
    color: 'hsl(var(--sidebar-button-active-foreground))',
    icon: undefined
  },
  {
    label: 'DONE',
    value: 'done',
    color: '#37b24d',
    icon: CheckCircle
  },
  {
    label: 'FAIL',
    value: 'fail',
    color: '#f03e3e',
    icon: CircleOff
  },
  {
    label: 'DEFAULT',
    value: 'default',
    color: '',
    icon: undefined
  }
];
