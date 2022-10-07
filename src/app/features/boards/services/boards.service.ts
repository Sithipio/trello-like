import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IBoards } from '@shared/models/boards.model';
import { URL_BOARD } from '@shared/constant';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {

  constructor(private httpClient: HttpClient) {
  }

  public getBoards(): Observable<IBoards[]> {
    return this.httpClient.get<IBoards[]>(URL_BOARD);
  }

  public getBoardById(boardId): Observable<IBoards> {
    return this.httpClient.get<IBoards>(`${URL_BOARD}/${boardId}`);
  }

  public addBoard(board: IBoards): Observable<IBoards> {
    return this.httpClient.post<IBoards>(URL_BOARD, board);
  }

  public deleteBoard(boardId: string): Observable<any> {
    return this.httpClient.delete(`${URL_BOARD}/${boardId}`);
  }

  public updateBoard(boardId: string, form: IBoards): Observable<IBoards> {
    return this.httpClient.patch<IBoards>(`${URL_BOARD}/${boardId}`, form);
  }

  public toggleFavorite(boardId: string, isFavorite: boolean): Observable<IBoards> {
    return this.httpClient.put<IBoards>(`${URL_BOARD}/${boardId}`, { boardId, isFavorite });
  }

}
