import { IColumn } from '@shared/models/column.model';
import { BoardBackground } from '@shared/enums/board-background';

export interface IBoards {
  id: string;
  name: string;
  background: BoardBackground;
  isFavorite: boolean;
  column: IColumn[];
}
