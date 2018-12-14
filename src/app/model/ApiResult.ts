import { LogBag } from './LogBag';

export class LogResult {
  log: LogBag[];
  until: number;

  public static fromApi(r: any): LogResult {
    let logs = [];
    for (let l of r.log) {
      logs.push(LogBag.fromApi(l));
    }

    return {
      log: logs,
      until: r.until
    }
  }
}