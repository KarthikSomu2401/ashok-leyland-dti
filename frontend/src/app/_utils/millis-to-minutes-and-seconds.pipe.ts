import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'millisToMinutesAndSeconds'
})
export class MillisToMinutesAndSecondsPipe implements PipeTransform {
    transform(millis: any): string {
        if (millis > 0) {
            var minutes: number | any = Math.floor(millis / 60000);
            var seconds: number | any = ((millis % 60000) / 1000).toFixed(0);
            return `${minutes} minutes ${(seconds < 10 ? "0" : "")}${seconds} seconds`;
        } else {
            return `In Progress`;
        }
    }

}