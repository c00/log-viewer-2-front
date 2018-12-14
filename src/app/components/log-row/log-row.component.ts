import { Component, OnInit, Input } from '@angular/core';
import { LogBag } from '../../model/LogBag';

@Component({
  selector: 'app-log-row',
  templateUrl: './log-row.component.html',
  styleUrls: ['./log-row.component.scss']
})
export class LogRowComponent implements OnInit {
  @Input() bag: LogBag;
  selected = false;
  collapsed = false;

  constructor() { }

  ngOnInit() {
  }

}
