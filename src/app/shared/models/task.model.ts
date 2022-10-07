import { IUser } from '@shared/models/user.model';
import { ITag } from '@shared/models/tag.model';
import { TaskBackground } from '@shared/enums';

export interface ITask {
  id: string;
  name: string;
  description: string;
  tag: ITag[];
  date: string;
  background: TaskBackground;
  order: number;
  column : string;
  boardId: string;
  user: IUser[];
}
