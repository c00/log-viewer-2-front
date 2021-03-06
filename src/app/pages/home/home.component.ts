import { Component, OnInit } from '@angular/core';
import { LogService } from '../../../services/logService';
import { Config } from '../../model/Config';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  configs: Config[] = [];
  errorMessage: string;

  constructor(log: LogService, title: Title) {
    title.setTitle('Log Viewer v2');

    log.getConfigs().then(c => {
      this.configs = c;
      if (c.length === 0) this.errorMessage = "No databases configured.";
    });
  }

  ngOnInit() {
    
  }

}
