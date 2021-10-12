import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitAndTitleCase'
})
export class SplitAndTitleCasePipe implements PipeTransform {
  transform(value: string, delimitter = "_", joinDelimitter = " "): string {
    return value.split(delimitter).map((str) => str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()).join(joinDelimitter);
  }

}
