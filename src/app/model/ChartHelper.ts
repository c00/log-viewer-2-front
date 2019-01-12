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

  public static toPie(inputData: any, valueProp?: string, labelProp?: string, bgColorProp?: string, borderColorProp?: string): PieData {
    //Set defaults
    if (!valueProp) valueProp = 'value';
    if (!labelProp) labelProp = 'name';
    if (!bgColorProp) bgColorProp = 'bgColor';
    if (!borderColorProp) borderColorProp = 'borderColor';

    //const result: PieData = { datasets : [{ data: []}] };
    const dataset = { data: [], backgroundColor: [], borderColor: [] };
    const labels = [];

    let i = 0;
    for (let d of inputData) {
      if (!d[valueProp]){
        console.warn(`Value ${valueProp} not found.`, d);
        continue;
      }
      dataset.data.push(d[valueProp]);
      dataset.backgroundColor.push(d[bgColorProp] || this.DEFAULT_COLORS[i]) ;
      if (d[borderColorProp]) dataset.borderColor.push(d[borderColorProp]);
      labels.push(d[labelProp]);

      i++;
    }

    return {labels, datasets: [dataset]};
  }
}

export interface PieData {
  datasets: { data: Number[] }[];
  labels?: string[];
  backgroundColor?: string[];
  borderColor?: string[];
}