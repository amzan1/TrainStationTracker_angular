import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateRangeFilter'
})
export class DateRangeFilterPipe implements PipeTransform {

  transform(items: any[], startDate: Date, endDate: Date): any[] {
    if (!items || !startDate || !endDate) {
      return items;
    }
    return items.filter(item => {
      const date = new Date(item.bookingtime);
      return date >= startDate && date <= endDate;
    });
  }
}
