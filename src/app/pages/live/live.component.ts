import { Component, OnInit } from '@angular/core';
import { Config } from '../../model/Config';
import { LogService } from '../../../services/logService';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {
  config: Config;
  lastChecked: number;

  constructor(
    public log: LogService,
    private route: ActivatedRoute,
  ) { 
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.load(Number(paramMap.get('id')));
    });

    this.log.newLogs.subscribe(l => {
      this.lastChecked = + new Date();
    })
  }

  ngOnInit() {
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
