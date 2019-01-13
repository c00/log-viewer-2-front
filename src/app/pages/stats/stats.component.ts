import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';
import { BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';

import { LogService } from '../../../services/logService';
import { StatsResult } from '../../model/ApiResult';
import { ChartHelper, PieSeries } from '../../model/ChartHelper';
import { Config } from '../../model/Config';
import { LevelStat } from 'src/app/model/Stats';
import { UrlStat } from '../../model/Stats';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  config: Config;
  errorMessage: string;
  dateRange: Date[] = [
    moment().startOf('isoWeek').toDate(),
    moment().endOf('isoWeek').toDate(),
  ];
  loading = false;
  dtpConfig: Partial<BsDaterangepickerConfig> = {
    rangeInputFormat: 'DD-MM-YYYY',
  };

  stats: StatsResult;
  levelCols = LevelStat.getTableColumns();
  urlCols = UrlStat.getTableColumns();

  levelPie: PieSeries;
  urlPie: PieSeries;

  //debug stuff
  rows = [
    { meuk: 123, ids: 1, name: 'wef'},
    { meuk: 123, ids: 2, name: 'bar'},
  ]
  cols = [
    { prop: 'ids', name: 'The number' },
    { prop: 'name', name: 'The name' },
  ];

  constructor(
    public log: LogService,
    private route: ActivatedRoute,
    private title: Title,
  ) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const id = Number(paramMap.get('id'));
      this.load(id);
    });
  }

  private async load(configId: number) {
    this.config = undefined;
    this.errorMessage = undefined;

    try {
      this.config = await this.log.setConfig(configId);
      this.dtpConfig.minDate = new Date(this.config.firstLogDate);
      this.title.setTitle(`${this.config.name} - Stats`);

      await this.doSearch();
    } catch (err) {
      if (err.error && err.error.message) {
        this.errorMessage = err.error.message;
      } else {
        this.errorMessage = "Unknown error";
      }
      console.error(err);
    }

  }

  public ngOnInit() { };

  public async dateChanged(e: Event) {
    if (e && this.config) this.doSearch();
  }

  public async doSearch() {
    //reset stuff
    this.errorMessage = undefined;
    this.loading = true;

    //Adjust dates
    let start = + moment(this.dateRange[0]).startOf('day');
    let end = + moment(this.dateRange[1]).endOf('day');

    //Talk to the API
    try {
      this.stats = await this.log.getLogStats(start, end);
      this.loading = false;
      this.levelPie = ChartHelper.toPieSeries(this.stats.levelStats, 'itemCount');
      this.urlPie = ChartHelper.toPieSeries(this.stats.urlStats, 'bagCount');
    } catch (err) {
      this.loading = false;
      if (err.error && err.error.message) {
        this.errorMessage = err.error.message;
      } else {
        this.errorMessage = "Unknown error";
      }
      console.error(err);
    }

  }
}
