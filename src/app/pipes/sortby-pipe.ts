import { Injectable, Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'sort',
    pure: false
})
@Injectable()
// Filter Cards using score of each card
export class SortByFilter implements PipeTransform {
    transform(items: SortBy[], scoreDesc: any): any {
        items.sort((a: any, b: any) => a.category > b.category ? -1 : 1);
        return items;
    }
}
export interface SortBy {
    category: String;
}
