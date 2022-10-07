import { ITask } from '@shared/models/task.model';

export interface IColumn {
  id: string;
  name: string;
  order: number;
  task: ITask[];
}
