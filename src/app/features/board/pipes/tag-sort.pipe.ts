import { Pipe, PipeTransform } from '@angular/core';

import { ITag } from '@shared/models';

@Pipe({
  name: 'tagSort',
})
export class TagSortPipe implements PipeTransform {

  transform(value: ITag[]): ITag[] {
    return value.sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    });
  }
}
