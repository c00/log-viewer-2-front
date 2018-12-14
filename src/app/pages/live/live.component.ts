import { Component, OnInit, ViewChildren } from '@angular/core';
import { Config } from '../../model/Config';
import { LogService } from '../../../services/logService';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LogBag } from '../../model/LogBag';
import { LogRowComponent } from '../../components/log-row/log-row.component';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {
  config: Config;
  lastChecked: number;
  bags: LogBag[] = [];
  @ViewChildren(LogRowComponent) rows;
  allCollapsed = false;

  constructor(
    public log: LogService,
    private route: ActivatedRoute,
  ) { 
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.load(Number(paramMap.get('id')));
    });

    this.log.newLogs.subscribe(l => {
      console.log("Getting news", l);
      this.lastChecked = + new Date();

      this.bags.unshift.apply(this.bags, l.log);
      
    });
  }

  ngOnInit() {
  }

  public toggleCollapseAll() {
    this.allCollapsed = !this.allCollapsed;

    this.rows.forEach((r: LogRowComponent) => {
      r.collapsed = this.allCollapsed;
    });
  }

  private load(configId: number) {
    this.log.getConfig(configId).then(c => this.config = c)
    .then(() => this.log.startMonitor());
  }

  public toggleMonitor() {
    if (this.log.monitoring) {
      this.log.stopMonitor();
    } else {
      this.log.startMonitor();
    }
  }

}
