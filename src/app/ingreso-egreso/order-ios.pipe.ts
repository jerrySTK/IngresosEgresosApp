import { Pipe, PipeTransform } from '@angular/core';
import { IncomeOutcome } from './income-outcome.model';

@Pipe({
  name: 'orderIos'
})
export class OrderIosPipe implements PipeTransform {

  transform(value: IncomeOutcome[]): IncomeOutcome[] {
    return value.sort((a, b) => {
      if (a.type === 'income') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
