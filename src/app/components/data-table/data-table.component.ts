import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit, OnChanges {

  @Input() rows: any[] = null;
  @Input() columns: DataTableColumn[] = [];
  @Input() sortOn: string;
  @Input() sortAsc = true;
  @Input() tableClass: string = "table";

  sorted: any[] = [];

  constructor() { }

  ngOnChanges() {
    if (this.rows === null || !Array.isArray(this.rows)) return;
    console.log("onchanges", this.rows);
    this.setup();
  }
  
  ngAfterViewInit() {
    console.log("AfterViewInit");
    //console.log("onchanges", this.rows);
  }

  private setup() {
    if (this.columns.length === 0) this.makeColumns();
    this.setColumnDefaults();
    this.sort();
  }

  /**
   * Makes empty columns based on Object keys
   */
  private makeColumns() {
    if (this.rows.length === 0){
      console.warn("No rows. Can't make table.");
      return;      
    }

    this.columns = [];

    const row = this.rows[0];
    for (let key in row) {
      if (!row.hasOwnProperty([key])) continue;
      this.columns.push({ prop: key, name: key });
    }
  }

  private setColumnDefaults() {
    const row = this.rows[0] || {};
    const keys = Object.keys(row)

    let i = 0;
    for (let c of this.columns) {
      if (!c.prop) c.prop = keys[i] || null;
      if (!c.name) c.name = c.prop;

      i++;
    }
  }

  private sort(on?: string) {
    console.log("Sorting on", on);

    if (!on && !this.sortOn) {
      //don't sort, just return the full thing
      this.sorted = [...this.rows];
      return;
    }

    let flipAsc = true;
    //If there's no sortOn, don't flip.
    if(this.sortOn === undefined) flipAsc = false;
    //If we're sorting on a different property, don't flip.
    if (this.sortOn !== on) flipAsc = false;

    //Flip if we have to
    if (flipAsc) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortAsc = true;
    }

    if (on) this.sortOn = on;

    this.sorted = this.rows.sort((a, b) => {
      if (this.sortAsc) {
        return this.spaceship(this.getValue(a, this.sortOn), this.getValue(b, this.sortOn));
      } else {
        return this.spaceship(this.getValue(b, this.sortOn), this.getValue(a, this.sortOn));
      }
    });
  }

  private spaceship(val1: any, val2: any) {
    if ((val1 === null || val2 === null) || (typeof val1 != typeof val2)) {
      return null;
    }
    if (typeof val1 === 'string') {
      return (val1).localeCompare(val2);
    } else {
      if (val1 > val2) {
        return 1;
      } else if (val1 < val2) {
        return -1;
      }
      return 0;
    }
  }

  public getValue(row: any, prop: string) {
    let path = prop.split('.');
    if (path.length === 1) return row[prop];
    
    const currentProp = path.splice(0, 1)[0];
    return this.getValue(row[currentProp], path.join('.'));
  };

}


export interface DataTableColumn {
  prop?: string;
  name?: string;
  sorted?: string; //asc,desc, null

}