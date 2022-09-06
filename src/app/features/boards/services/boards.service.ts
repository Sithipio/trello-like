import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IBoards} from '@shared/interfaces/boards.interface';
import {URL_BOARD} from '@shared/constant';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {

  constructor(private httpClient: HttpClient) {
  }

  public getBoards(): Observable<IBoards[]> {
    return this.httpClient.get<IBoards[]>(URL_BOARD);
  }

  public getBoardById(id): Observable<IBoards> {
    return this.httpClient.get<IBoards>(`${URL_BOARD}/${id}`);
  }

  public addBoard(board: IBoards): Observable<IBoards> {
    return this.httpClient.post<IBoards>(URL_BOARD, board);
  }

  public deleteBoard(id: string): Observable<any> {
    return this.httpClient.delete(`${URL_BOARD}/${id}`);
  }

  public updateBoard(id: string, form: IBoards): Observable<IBoards> {
    return this.httpClient.patch<IBoards>(`${URL_BOARD}/${id}`, form);
  }

  public toggleFavorite(id: string, isFavorite: boolean): Observable<IBoards> {
    return this.httpClient.put<IBoards>(`${URL_BOARD}/${id}`, {id, isFavorite});
  }

}
