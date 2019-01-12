import { LevelHelper, Level } from './Levels';
import { PieData, ChartHelper } from './ChartHelper';

export class LevelStat {
  private _levelObject: Level;
  get levelObject(): Level {
    if (!this._levelObject) this._levelObject = LevelHelper.getLevel(this.level);
    return this._levelObject;
  }

  level: number = null;
  bagCount: number = null;
  itemCount: number = null;

  get name() { 
    return this.levelObject ? this.levelObject.name : '';
  }

  get bgColor() { 
    return this.levelObject ? this.levelObject.bgColor : '';
  }

  get borderColor() {
    return this.levelObject ? this.levelObject.border : '';
  }
}

export class UrlStat {
  private _levelObject: Level;
  get levelObject(): Level {
    if (!this._levelObject) this._levelObject = LevelHelper.getLevel(this.level);
    return this._levelObject;
  }

  url: string = null;
  verb: string = null;
  level: number = null;
  bagCount: number = null;
  itemCount: number = null;

  get name() { 
    return `${this.verb} ${this.url}`;
  }
}