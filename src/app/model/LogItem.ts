import { TraceLine } from './TraceLine';

export interface LogItem {
  id: number;
  bagId: number;
  caller: string;
  date: number;
  level: number;
  message: string;
  object: any;
  tag: string;
  trace: TraceLine[];
}