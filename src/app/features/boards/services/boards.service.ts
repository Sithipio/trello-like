import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IBoards} from '@shared/interfaces/boards.interface';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {

  constructor(private httpClient: HttpClient) {
  }

  public getBoards(): Observable<IBoards[]> {
    return this.httpClient.get<IBoards[]>('/boards');
  }

  public getBoardById(id): Observable<IBoards> {
    return this.httpClient.get<IBoards>(`/boards/${id}`);
  }

  public addBoard(board: IBoards): Observable<IBoards> {
    return this.httpClient.post<IBoards>('/boards', board);
  }

  public deleteBoard(id: string): Observable<any> {
    return this.httpClient.delete(`/boards/${id}`);
  }

  public editBoard(id: string, form: IBoards): Observable<IBoards> {
    return this.httpClient.patch<IBoards>(`/boards/${id}`, form);
  }

  public toggleFavorite(id: string, isFavorite: boolean): Observable<IBoards> {
    return this.httpClient.put<IBoards>(`/boards/${id}`, {id, isFavorite});
  }

}
