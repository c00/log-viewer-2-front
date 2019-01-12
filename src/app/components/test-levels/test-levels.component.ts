import { Component, OnInit, ViewChildren, ElementRef, QueryList, AfterViewInit } from '@angular/core';
import { levels } from 'src/app/model/Levels';

@Component({
  selector: 'app-test-levels',
  templateUrl: './test-levels.component.html',
  styleUrls: ['./test-levels.component.scss']
})
export class TestLevelsComponent implements AfterViewInit {
  levels = levels;
  @ViewChildren('circles') circles: QueryList<ElementRef>;
  colorInfo: levelColors[] = [];

  constructor() { }

  ngAfterViewInit() {
    this.circles.forEach((e, index) => {
      const level = this.levels[index];
      const styles = getComputedStyle(e.nativeElement);
      this.colorInfo.push({class: level.class, name: level.name, backgroundColor: styles.backgroundColor, borderColor: styles.borderColor});

      level.bgColor = styles.backgroundColor;
      level.border = styles.borderColor;
    });
  }

  public printColorInfo() {
    const backgroundColor = [];
    const borderColor = [];

    

    for (let i of this.colorInfo) {
      backgroundColor.push(i.backgroundColor);
      borderColor.push(i.borderColor);
    }



    return JSON.stringify({backgroundColor, borderColor}, null, 2);
  }

}

interface levelColors {
  class: string;
  name: string;
  backgroundColor: string;
  borderColor: string;
}