import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LogResult } from 'src/app/model/ApiResult';

import { Config } from '../app/model/Config';
import { ApiService } from './api';
import { StatsResult } from '../app/model/ApiResult';
import { LevelStat, UrlStat } from '../app/model/Stats';
import { cereal } from 'src/app/model/Cerealize';

@Injectable()
export class LogService {

  private configPromise: Promise<Config[]>;
  private tagsPromise: { [key: string]: Promise<string[]> } = {};
  private _selectedDb: Config = { name: 'none loaded', id: -1 };
  private _busy = false;
  private _interval;

  public dbChanged = new Subject<Config>();
  public newLogs = new Subject<LogResult>();
  public tagsAdded = new Subject<string[]>();
  public lastChecked = 0;

  public get busy(): boolean {
    return this._busy;
  }

  public get monitoring() {
    return Boolean(this._interval);
  }

  public get selectedDb() {
    return this._selectedDb;
  }

  constructor(
    private api: ApiService,
  ) {
    this.getConfigs();
  }

  public getConfigs(refresh?: boolean): Promise<Config[]> {
    if (this._selectedDb.id === -1) this._selectedDb.name = "loading...";

    if (!this.configPromise || refresh) {
      this.configPromise = this.api.get('configs')
        .then((configs) => {
          if (configs[0] && this._selectedDb.id === -1) this._selectedDb = configs[0];
          return configs;
        })
        .catch(err => {
          if (this._selectedDb.id === -1) this._selectedDb.name = "Error loading Configs"
          throw err;
        });
    }

    return this.configPromise;
  }

  public async setConfig(configId: number): Promise<Config> {
    const result = await this.getConfigs();
    this._selectedDb = result[configId];
    this.dbChanged.next(this._selectedDb);
    this.stopMonitor();
    return this.api.get(`config/${configId}`);
  }

  public async getLog(since?: number): Promise<LogResult> {
    if (!since) since = 0;
    const r = await this.api.get(`log/${this._selectedDb.id}/${since}`);
    return LogResult.fromApi(r);
  }

  public async getLogStats(start: number, end: number): Promise<StatsResult> {
    const r = await this.api.get(`stats/${this._selectedDb.id}/${start}/${end}`);
    r.levelStats = cereal.toArrayOf(LevelStat, r.levelStats);
    r.urlStats = cereal.toArrayOf(UrlStat, r.urlStats);
    return r;
  }

  public async getLogRange(from: number, to: number, page?: number, filters?: any): Promise<LogResult> {
    if (!page) page = 0;

    const filterString = this.getFilterString(filters);
    const r = await this.api.get(`log/${this._selectedDb.id}/${from}/${to}?page=${page}${filterString}`);
    return LogResult.fromApi(r);
  }

  private getFilterString(filters: any): string {
    if (!filters) return '';
    let s = '';
    if (filters.levels) {
      s += `&levels=${encodeURIComponent(JSON.stringify(filters.levels))}`;
    }

    if (filters.tags) {
      s += `&tags=${encodeURIComponent(JSON.stringify(filters.tags))}`;
    }

    return s;
  }

  public getTags(refresh?: boolean): Promise<string[]> {
    if (this._selectedDb.id === -1) return Promise.resolve([]);

    if (!this.tagsPromise[this._selectedDb.id] || refresh) {
      this.tagsPromise[this._selectedDb.id] = this.api.get(`tags/${this._selectedDb.id}`);
    }

    return this.tagsPromise[this._selectedDb.id];
  }

  public startMonitor(since?: number) {
    if (!since) since = 0;

    if (this._interval) this.stopMonitor();

    this._interval = setInterval(() => {
      this.getUpdates();
    }, 3000);

    //Trigger furst run
    this.getUpdates();
  }

  public stopMonitor() {
    if (this._interval) {
      clearInterval(this._interval);
      this.lastChecked = 0;
      this._interval = undefined;
    }
  }

  private getUpdates() {
    if (this._busy) {
      console.warn("Still doing stuff");
      return;
    }

    this._busy = true;
    this.api.get(`log/${this._selectedDb.id}/${this.lastChecked}`)
      .then((r) => {
        const lr = LogResult.fromApi(r);
        this._busy = false;
        this.newLogs.next(lr);
        this.lastChecked = lr.until;
      })
      .catch((err) => {
        this._busy = false;
        console.error("Error in monitor. Killing interval.");
        this.stopMonitor();
        throw err;
      });
  }

}
