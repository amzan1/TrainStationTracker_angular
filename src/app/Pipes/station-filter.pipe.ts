import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stationFilter'
})
export class StationFilterPipe implements PipeTransform {

  transform(items: any[], trainSearch: string): any[] {
    if (!items) return [];
    if (!trainSearch) return items;
    trainSearch = trainSearch.toLowerCase();
    return items.filter(item => {
      return (
        item.stationname?.toLowerCase().includes(trainSearch)
      );
    });
  }
}
