import { LogBag } from './LogBag';

export interface LogResult {
  log: LogBag[];
  until: number;
}