import { Pipe, PipeTransform } from '@angular/core';

import { IBoards } from '@shared/models';

@Pipe({
  name: 'favoriteHeader',
})
export class FavoriteHeaderPipe implements PipeTransform {

  public transform(items: IBoards[]) {
    if (!items) return [];
    return !!items.some(item => item.isFavorite === true);
  }
}
