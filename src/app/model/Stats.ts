import { Level, LevelHelper } from './Levels';
import { DataTableColumn } from '../components/data-table/data-table.component';

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

  public static getTableColumns(): DataTableColumn[] {
    return [
      { name: "Level", prop: 'levelObject.name' },
      { name: "Requests", prop: 'bagCount' },
      { name: "Log Items", prop: 'itemCount' }
    ];
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

  public static getTableColumns(): DataTableColumn[] {
    return [
      { name: "Verb", prop: 'verb' },
      { name: "URL", prop: 'url' },
      { name: "Level", prop: 'levelObject.name' },
      { name: "Requests", prop: 'bagCount' },
      { name: "Log Items", prop: 'itemCount' }
    ];
  }
}