import { Pipe, PipeTransform } from '@angular/core';
import { logLevels } from './model/LogItem';

@Pipe({
  name: 'logLevel'
})
export class LogLevelPipe implements PipeTransform {
  
  transform(value: any, args?: any): any {
    return logLevels[value].name;  
  }

}
