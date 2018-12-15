import { Component } from '@angular/core';

import { LogService } from '../services/logService';
import { Config } from './model/Config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  configs: Config[] = [];
  
  constructor(public log: LogService) {
    this.log.getConfigs().then(c => this.configs = c);
  }

}
