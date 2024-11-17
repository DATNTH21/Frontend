import { ArrowDown, ArrowRight, ArrowUp, CheckCircle, CircleOff, Timer } from 'lucide-react';

export const statuses = [
  {
    value: 'in progress',
    label: 'In Progress',
    icon: Timer
  },
  {
    value: 'passed',
    label: 'Passed',
    icon: CheckCircle
  },
  {
    value: 'failed',
    label: 'Failed',
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
