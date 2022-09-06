import { Pipe, PipeTransform } from '@angular/core';

import { IBoards } from '@shared/interfaces/boards.interface';

@Pipe({
  name: 'favoriteBoards',
})
export class FavoriteBoardsPipe implements PipeTransform {

  transform(items: IBoards[]): IBoards[] {
    if (!items) return [];
    return [...items].sort((a, b) => {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    }).filter(item => item.isFavorite === true)

  }

}
