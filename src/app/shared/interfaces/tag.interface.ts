import { TagBackground } from '@shared/enums';

export interface ITag {
  id?: string;
  name: string;
  background: TagBackground;
  createdDate: Date;
}
