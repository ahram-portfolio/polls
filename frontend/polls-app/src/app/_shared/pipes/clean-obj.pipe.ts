import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanObj'
})
export class CleanObjPipe implements PipeTransform {

  transform(obj: any): any {
    for (const prop in obj) {
      if (this.isEmptyValue(obj[prop])) {
        delete obj[prop];
      }
    }
    return obj;
  }

  private isEmptyValue(value: any) {
    return (
      value !== 0 &&
      (
        value === 'undefined' ||
        value === null ||
        value === 'null' ||
        value === '' ||
        typeof value === 'undefined'
      )
    );
  }

}
