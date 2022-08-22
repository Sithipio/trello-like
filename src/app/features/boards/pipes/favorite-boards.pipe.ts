import {Pipe, PipeTransform} from '@angular/core';
import {IBoards} from "@shared/interfaces/boards.interface";

@Pipe({
  name: 'favoriteBoards'
})
export class FavoriteBoardsPipe implements PipeTransform {

  transform(items: IBoards[]): IBoards[] {
    if (!items) return [];
    return [...items].sort((a, b) => {
      if (a.boardName < b.boardName)
        return -1;
      if (a.boardName > b.boardName)
        return 1;
      return 0;
    }).filter(item => item.boardFavorite === true)

  }

}
