import { Component, OnInit, Input } from '@angular/core';
import sqlFormatter from "sql-formatter";

@Component({
  selector: 'app-sql-message',
  templateUrl: './sql-message.component.html',
  styleUrls: ['./sql-message.component.scss']
})
export class SqlMessageComponent implements OnInit {

  @Input() message: string;

  get sql() {
    return sqlFormatter.format(this.message);
  }

  constructor() { }

  ngOnInit() {
  }

}
