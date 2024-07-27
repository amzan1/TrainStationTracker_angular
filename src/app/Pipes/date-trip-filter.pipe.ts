import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTripFilter'
})
export class DateTripFilterPipe implements PipeTransform {

  transform(items: any[], startDate: Date, endDate: Date): any[] {
    if (!items || !startDate || !endDate) {
      return items;
    }
    return items.filter(item => {
      const date = new Date(item.departuretime);
      return date >= startDate && date <= endDate;
    });
  }
}
