import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../Services/admin.service';

@Pipe({
  name: 'tripsFilter'
})
export class TripsFilterPipe implements PipeTransform {

  transform(items: Trip[], tripSearch: string): Trip[] {
    if (!items) return [];
    if (!tripSearch) return items;

    tripSearch = tripSearch.toLowerCase();
    return items.filter(item => {
      const originStation = item.originstation ? item.originstation.toLowerCase() : '';
      const destinationStation = item.destinationstation ? item.destinationstation.toLowerCase() : '';

      return originStation.includes(tripSearch) || destinationStation.includes(tripSearch);
    });
  }
}
