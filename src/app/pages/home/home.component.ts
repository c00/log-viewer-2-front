import { Component, OnInit } from '@angular/core';
import { LogService } from '../../../services/logService';
import { Config } from '../../model/Config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  state = 'idle';
  b = '';
  configs: Config[] = [];

  constructor(log: LogService) {
    log.dbChanged.subscribe((c) => {
      console.log(c);
      this.b += "\nNew one";
    });

    log.getConfigs().then(c => this.configs = c);
  }

  ngOnInit() {
    
  }

}
