import { LogItem } from "./LogItem";

export interface LogBag {
  id: number;
  url: string;
  verb: string;
  ip: string;
  userId: string;
  date: number;
  logItems: LogItem[];
}