import { ArrowDown, ArrowRight, ArrowUp, CheckCircle, CircleOff, Timer } from 'lucide-react';

export const statuses = [
  {
    value: 'in progress',
    label: 'In Progress',
    color: '#09090b',
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

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDown
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRight
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUp
  }
];
