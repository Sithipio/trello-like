import { Pipe, PipeTransform } from '@angular/core';

import { ITask } from '@shared/models';

@Pipe({
  name: 'taskSort',
})
export class TaskSortPipe implements PipeTransform {

  transform(value: ITask[]): ITask[] {
    if (value) {
      return value.sort((a, b) => {
        if (a.order < b.order) return -1;
        else if (a.order > b.order) return 1;
        else return 0;
      });
    }
  }
}
