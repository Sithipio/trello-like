import { ITask } from '@shared/interfaces/task.interface';

export interface IColumn {
  id: string;
  name: string;
  order: number;
  task: ITask[];
}
