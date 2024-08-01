import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tripsFilter'
})
export class TripsFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
