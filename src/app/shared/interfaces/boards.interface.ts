import {IBoard} from "@shared/interfaces/board.interface";
import {BoardBackground} from '@shared/enums/board-background';

export interface IBoards {
  id: string;
  name: string;
  background: BoardBackground;
  isFavorite: boolean;
  //todo delete this below
  boardColumn: IBoard[];
}
