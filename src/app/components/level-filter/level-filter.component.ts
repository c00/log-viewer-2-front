import { Component, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-level-filter',
  templateUrl: './level-filter.component.html',
  styleUrls: ['./level-filter.component.scss']
})
export class LevelFilterComponent implements OnInit {
  filters = [
    { name: 'Extra Debug', level: 5, selected: false },
    { name: 'Debug', level: 4, selected: false },
    { name: 'Info', level: 3, selected: false },
    { name: 'Warning', level: 2, selected: false },
    { name: 'Error', level: 1, selected: false },
  ];

  @Output() update = new EventEmitter<number[]>();
  
  constructor() { }

  public ngOnInit() {
  }

  public clicked() {
    this.update.emit(this.getSelectedLevels());
  }

  public getSelectedLevels(): number[] {
    let selected = [];
    for (let f of this.filters) {
      if (f.selected) selected.push(f.level);
    }

    //If none are selected, select all
    if (selected.length === 0) {
      for (let f of this.filters) {
        selected.push(f.level);
      } 
    }

    return selected;      
  }

  public getSummary(): string {
    let selected = [];
    for (let f of this.filters) {
      if (f.selected) selected.push(f.name);
    }

    if (selected.length === this.filters.length || selected.length === 0) {
      return "All levels shown";
    } else if (selected.length === 1) {
      return `Showing "${selected[0]}" only`;
    } else {
      return `Showing "${selected.join('", "')}"`;
    }
  }

}
