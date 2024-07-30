import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usersFilter'
})
export class UsersFilterPipe implements PipeTransform {

  transform(items: any[], searchTerm: string): any[] {
    if (!items) return [];
    if (!searchTerm) return items;
    searchTerm = searchTerm.toLowerCase();
    return items.filter(item => {
      return (
        item.username?.toLowerCase().includes(searchTerm) || 
        item.email?.toLowerCase().includes(searchTerm)
      );
    });
  }
}

