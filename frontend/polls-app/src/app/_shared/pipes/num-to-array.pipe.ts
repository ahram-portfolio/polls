import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numToArray',
  pure: false
})
export class NumToArrayPipe implements PipeTransform {

  transform(value: number): any {
    return new Array(value);
  }

}
