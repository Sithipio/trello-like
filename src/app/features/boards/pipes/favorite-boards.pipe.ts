import { Pipe, PipeTransform } from '@angular/core';

import { IBoards } from '@shared/models/boards.model';

@Pipe({
  name: 'favoriteBoards',
})
export class FavoriteBoardsPipe implements PipeTransform {

  public transform(items: IBoards[]): IBoards[] {
    if (!items) return [];
    return [...items].sort((a, b) => {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    }).filter(item => item.isFavorite === true);

  }

}
