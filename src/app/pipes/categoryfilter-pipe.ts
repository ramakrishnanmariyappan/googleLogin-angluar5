import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { PostsComponent } from '../posts/posts.component';
@Pipe({
    name: 'filter',
    pure: false
})
@Injectable()
// Filter Books using Title, Author of each post
export class CategoryByNameFilter implements PipeTransform {
    transform(items: any, inputName: string): any {
        inputName = inputName ? inputName.toLocaleLowerCase() : '';
        return inputName && items ?
            items.filter((book: CategoryByName) =>
                (book.category.toLocaleLowerCase().indexOf(inputName) !== -1)
            ) : items;
    }
}
export interface CategoryByName {
    category: String;
}
