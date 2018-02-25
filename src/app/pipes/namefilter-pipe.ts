import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { PostsComponent } from '../posts/posts.component';
@Pipe({
    name: 'name',
    pure: false
})
@Injectable()
// Filter Books using Title, Author of each post
export class SearchByNameFilter implements PipeTransform {
    transform(items: any, inputName: string): any {
    inputName = inputName ? inputName.toLocaleLowerCase() : '';
    return inputName && items ?
      items.filter((product: SearchByName) =>
         (product.title.toLocaleLowerCase().indexOf(inputName) !== -1) ||
         (product.author.toLocaleLowerCase().indexOf(inputName) !== -1)
      ) :
      items;
    }
}
export interface SearchByName {
            title: String;
            author: String;
}
