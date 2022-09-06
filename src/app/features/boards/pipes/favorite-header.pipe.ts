import { Pipe, PipeTransform } from '@angular/core';

import { IBoards } from '@shared/interfaces/boards.interface';

@Pipe({
  name: 'favoriteHeader',
})
export class FavoriteHeaderPipe implements PipeTransform {

  transform(items: IBoards[]) {
    if (!items) return [];
    return !!items.some(item => item.isFavorite === true);
  }
}
