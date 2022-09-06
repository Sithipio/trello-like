import { IColumn } from '@shared/interfaces/column.interface';
import { BoardBackground } from '@shared/enums/board-background';

export interface IBoards {
  id: string;
  name: string;
  background: BoardBackground;
  isFavorite: boolean;
  column: IColumn[];
}
