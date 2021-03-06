import { LogItem, logLevels } from './LogItem';

export class LogBag {
  id: number = null;
  url: string = null;
  verb: string = null;
  ip: string = null;
  userId: string = null;
  date: number = null;
  logItems: LogItem[] = null;

  private _duration;

  public get duration(): string {
    if (!this._duration) {
      if (!this.logItems || this.logItems.length <= 1) this._duration = '0 sec';

      const ms = this.logItems[this.logItems.length - 1].date - this.logItems[0].date;

      this._duration = ms / 1000 + " sec";
    }

    return this._duration
  }

  public get levelColor(): string {
    let level = 5;
    for (let i of this.logItems) {
      if (i.level < level) level = i.level;
    }

    return logLevels[level].colorClass;
  }

  static fromApi(response: any): LogBag {
    let l = new LogBag();

    Object.keys(response).forEach(key => {
      if (response.hasOwnProperty(key) && l.hasOwnProperty(key)) {
        l[key] = response[key];
      }
    });

    return l;
  }

  public hasLevels(levelsWanted: number[]): boolean {
    let levelsGotten: number[] = [];
    for (let i of this.logItems) {
      if (levelsGotten.indexOf(i.level) === -1) levelsGotten.push(i.level);
    }

    //Intersect the 2 arrays
    let overlap = levelsWanted.filter(value => -1 !== levelsGotten.indexOf(value));


    return overlap.length > 0;

  }
}