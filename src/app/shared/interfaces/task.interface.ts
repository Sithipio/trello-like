import { IUser } from '@shared/interfaces/user.interface';
import { ITag } from '@shared/interfaces/tag.interface';

export interface ITask {
  id: string;
  name: string;
  description: string;
  tag: ITag[];
  date: string;
  background: string;
  order: number;
  columnId: string;
  boardId: string;
  user: IUser[];
}
