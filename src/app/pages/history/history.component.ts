import { Component, OnInit, ViewChildren } from '@angular/core';
import { Config } from '../../model/Config';
import { LogBag } from '../../model/LogBag';
import { LogRowComponent } from '../../components/log-row/log-row.component';
import { LogService } from '../../../services/logService';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { LogResult } from '../../model/ApiResult';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  config: Config;
  lastChecked: number;
  bags: LogBag[] = [];
  @ViewChildren(LogRowComponent) rows;
  allCollapsed = false;
  dateRange: Date[];
  page = 0;
  pageCount = 1;
  loading = false;

  timeRange = {
    date: new Date(),
    startTime: moment().startOf('day').toDate(),
    endTime: moment().endOf('day').toDate()
  };
  useTimeRange = false;
  

  dtpConfig: Partial<BsDaterangepickerConfig> = {
    rangeInputFormat: 'DD-MM-YYYY',
  };

  constructor(
    public log: LogService,
    private route: ActivatedRoute,
  ) { 
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const id = Number(paramMap.get('id'));
      this.log.getConfig(id)
      .then(c => this.config = c)
      .then(() => {
        this.dtpConfig.minDate = new Date(this.config.firstLogDate);
        this.dateRange = [
          new Date(this.config.firstLogDate),
          new Date(this.config.lastLogDate)
        ]
      });
    });

    this.log.newLogs.subscribe(l => {
      this.lastChecked = + new Date();

      this.bags.unshift.apply(this.bags, l.log);
      
    });
  }

  public ngOnInit() {
  }

  public toggleCollapseAll() {
    this.allCollapsed = !this.allCollapsed;

    this.rows.forEach((r: LogRowComponent) => {
      r.collapsed = this.allCollapsed;
    });
  }

  public dateChanged(dateString) {
    if (!dateString) return;

    //Update the times so that we ave a proper dateRange
    const newDate = moment(dateString);

    const start = moment(this.timeRange.startTime)
    .date(newDate.date())
    .month(newDate.month())
    .year(newDate.year());
    this.timeRange.startTime = start.toDate();

    const end = moment(this.timeRange.endTime)
    .date(newDate.date())
    .month(newDate.month())
    .year(newDate.year());
    this.timeRange.endTime = end.toDate();
  }

  public doSearch() {
    let start, end;
    if (this.useTimeRange) {
      start = + this.timeRange.startTime;
      end = + this.timeRange.endTime;
    } else {
      start = + moment(this.dateRange[0]).startOf('day');
      end = + moment(this.dateRange[1]).endOf('day');
    }

    this.loading = true;
    this.log.getLogRange(start, end, this.page)
    .then((r: LogResult) => {
      this.bags = r.log;
      this.pageCount = r.pageCount;
      this.loading = false;
    })
    .catch((err) => {
      this.loading = false;
      throw err;
    });
  }

  public nextPage() {
    if (this.isLastPage()) return;

    this.page++;
    this.doSearch();
  }

  public isLastPage(): boolean {
    return this.page >= this.pageCount - 1;
  }

  public prevPage() {
    if (this.page <= 0) return;

    this.page--;
    this.doSearch();
  }

}
