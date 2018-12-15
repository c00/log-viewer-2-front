import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { Config } from '../../model/Config';
import { LogService } from '../../../services/logService';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LogBag } from '../../model/LogBag';
import { LogRowComponent } from '../../components/log-row/log-row.component';
import { Title } from '@angular/platform-browser';
import { LevelFilterComponent } from '../../components/level-filter/level-filter.component';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {
  config: Config;
  lastChecked: number;
  bags: LogBag[] = [];
  filteredBags: LogBag[] = [];
  @ViewChild(LevelFilterComponent) levelFilter: LevelFilterComponent;
  @ViewChildren(LogRowComponent) rows;
  allCollapsed = false;
  errorMessage: string;

  constructor(
    public log: LogService,
    private route: ActivatedRoute,
    private title: Title,
  ) { 
    //Listen to route changes
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      //Reset stuff first
      this.bags = [];
      this.config = undefined;
      this.lastChecked = undefined;

      this.load(Number(paramMap.get('id')));
    });

    //Listen to new incoming logs
    this.log.newLogs.subscribe(l => {
      this.lastChecked = + new Date();

      this.bags.unshift.apply(this.bags, l.log);
      
    });

    //get collapse settings
    this.allCollapsed = localStorage.getItem('allCollapsed') === 'true';
  }

  ngOnInit() {
  }

  public toggleCollapseAll() {
    this.allCollapsed = !this.allCollapsed;

    localStorage.setItem('allCollapsed', String(this.allCollapsed));

    this.rows.forEach((r: LogRowComponent) => {
      r.collapsed = this.allCollapsed;
    });
  }

  private load(configId: number) {
    this.errorMessage = undefined;

    this.log.setConfig(configId).then(c => this.config = c)
    .then(() => {
      this.log.startMonitor();
      this.title.setTitle(`${this.config.name} - Live Logs`);
      this.filter();
    })
    .catch((err) => {
      if (err.error && err.error.message) {
        this.errorMessage = err.error.message;
      } else {
        this.errorMessage = "Unknown error";
      }
      console.log(err);
    });
  }

  public toggleMonitor() {
    if (this.log.monitoring) {
      this.log.stopMonitor();
    } else {
      this.log.startMonitor();
    }
  }

  public filter(levels?: number[]) {
    if (!this.levelFilter) {
      this.filteredBags = this.bags;
      return;
    } else if (!levels) {
      levels = this.levelFilter.getSelectedLevels();
    }

    if (levels.length === 0 || levels.length === this.levelFilter.filters.length) {
      //Show all.
      this.filteredBags = this.bags;
      return;
    }

    //Do some filtering
    this.filteredBags = this.bags.filter((bag: LogBag) => bag.hasLevels(levels));
  }

}
