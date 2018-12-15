import { LogBag } from './LogBag';

export class LogResult {
  log: LogBag[];
  until?: number;
  page?: number;
  pageCount?: number;

  public static fromApi(r: any): LogResult {
    let logs = [];
    for (let l of r.log) {
      logs.push(LogBag.fromApi(l));
    }

    const lr = new LogResult();
    lr.log = logs;
    lr.until = r.until;
    lr.page = r.page;
    lr.pageCount = r.pageCount;

    return lr;
  }
}