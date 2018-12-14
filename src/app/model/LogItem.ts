import { TraceLine } from './TraceLine';

export const logLevels = {
  "-1": { name: 'AUDIT', colorClass: 'audit' },
  "0": { name: 'NO_LOG', colorClass: 'no-log' },
  "1": { name: 'ERROR', colorClass: 'error' },
  "2": { name: 'WARNING', colorClass: 'warning' },
  "3": { name: 'INFO', colorClass: 'info' },
  "4": { name: 'DEBUG', colorClass: 'debug' },
  "5": { name: 'EXTRA_DEBUG', colorClass: 'extra-debug' },
}

export interface LogItem {
  id: number;
  bagId: number;
  caller: string;
  date: number;
  level: number;
  message: string;
  object?: any;
  tag: string;
  trace: TraceLine[];

  showObject?: boolean;
  showTrace?: boolean;
}