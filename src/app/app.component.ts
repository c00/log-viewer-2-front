import { Component } from '@angular/core';

import { LogService } from '../services/logService';
import { Config } from './model/Config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "Log Viewer";
  configs: Config[] = [];
  
  constructor(public log: LogService) {
    this.log.getConfigs().then(c => this.configs = c);
    this.log.dbChanged.subscribe(c => {
      this.title = c.name;
    });
  }

}
