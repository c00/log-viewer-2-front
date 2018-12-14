import { Injectable } from '@angular/core';
import { ApiService } from './api';
import { Config } from '../app/model/Config';
import { Subject } from 'rxjs';
import { LogResult } from 'src/app/model/ApiResult';
import { LogBag } from '../app/model/LogBag';

@Injectable()
export class LogService {

  private configPromise: Promise<Config[]>;
  private _selectedDb: Config = { name: 'none loaded', id: -1 };
  private _busy = false;
  private _interval;

  public dbChanged = new Subject<Config>();
  public newLogs = new Subject<LogResult>();
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
  public set selectedDb(c: Config) {
    if (c === this._selectedDb) return;
    
    this._selectedDb = c;
    this.dbChanged.next(c);
    this.stopMonitor();
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
        if (configs[0] && this._selectedDb.id === -1) this.selectedDb = configs[0];
        return configs;
      })
      .catch(err => {
        if (this._selectedDb.id === -1) this._selectedDb.name = "Error loading Configs"
        throw err;
      });
    }

    return this.configPromise;
  }

  public getConfig(configId: number) {
    return this.getConfigs().then(result => result[configId]);
  }

  public getLog(since?: number): Promise<LogResult> {
    if (!since) since = 0;
    return this.api.get(`log/${this._selectedDb.id}/${since}`)
    .then((r) => LogResult.fromApi(r) );
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


