import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { Chart, Options } from 'highcharts';
import { PieSeries } from '../../model/ChartHelper';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('container') chartContainer: ElementRef;
  chart: Chart;

  @Input() options: Options;
  @Input() series: PieSeries|PieSeries[];
  @Input() title: string = "A pie chart";

  private defaultOptions: Options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'A pie chart'
    },
    tooltip: {
      pointFormat: 'Frequency: <b>{point.y}</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        showInLegend: true
      }
    },
  };


  constructor() {

  }

  public async redraw() {
    return new Promise((resolve, reject) => {

      if (!this.series || !this.chartContainer) {
        //console.warn("Not loading chart");
        resolve();
        return;
      }

      const series = Array.isArray(this.series) ? this.series : [this.series];

      const options: any = { ...this.defaultOptions, ...this.options, series };
      if (this.title) options.title.text = this.title;

      this.chart = new Chart(this.chartContainer.nativeElement, options, () => {
        resolve();
      });
    });
  }

  ngOnChanges() {
    this.redraw();
  }

  ngAfterViewInit() {
    this.redraw();
  }

}
