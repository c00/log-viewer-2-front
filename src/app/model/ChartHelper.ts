import { levels } from './Levels';
export class ChartHelper {
  static DEFAULT_COLORS = [
    'rgb(244, 67, 54)',
    'rgb(233, 30, 99)',
    'rgb(103, 58, 183)',
    'rgb(63, 81, 181)',
    'rgb(33, 150, 243)',
    'rgb(3, 169, 244)',
    'rgb(0, 188, 212)',
    'rgb(0, 150, 136)',
    'rgb(76, 175, 80)',
    'rgb(139, 195, 74)',
    'rgb(205, 220, 57)',
    'rgb(255, 235, 59)',
    'rgb(255, 193, 7)',
    'rgb(255, 152, 0)',
    'rgb(255, 87, 34)',
    'rgb(121, 85, 72)',
    'rgb(96, 125, 139)',
  ]

  public static toPieSeries(inputData: any, valueProp?: string, labelProp?: string): PieSeries {
    //Set defaults
    if (!valueProp) valueProp = 'value';
    if (!labelProp) labelProp = 'name';

    const pieData : PieSeries = { data: [] };
    const dataset: DataPoint[] = [];

    for (let d of inputData) {
      if (!d[valueProp]){
        console.warn(`Value ${valueProp} not found.`, d);
        continue;
      }

      const dp: DataPoint = {
        name: d[labelProp],
        y: d[valueProp],
      };
      dataset.push(dp); 
    }

    pieData.data = dataset;

    return pieData;
  }
}

export interface PieSeries {
  name?: string;
  colorByPoint?: boolean;
  data: DataPoint[];
}

export interface DataPoint {
  name: string;
  y: number;
  selected?: boolean;
  sliced?: boolean;
}