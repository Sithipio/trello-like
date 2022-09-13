import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IColumn } from '@shared/interfaces';
import { URL_COLUMN } from '@shared/constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {

  constructor(private httpClient: HttpClient) {
  }

  public getColumnById(id): Observable<IColumn[]> {
    return this.httpClient.get<IColumn[]>(`/${id}${URL_COLUMN}`);
  }

  public createColumn(boardId: string, name: string): Observable<IColumn> {
    return this.httpClient.post<IColumn>(`/${boardId}${URL_COLUMN}`, name);
  }

  public updateColumn(boardId: string, columnId: string, name: string): Observable<IColumn> {
    return this.httpClient.patch<IColumn>(`/${boardId}${URL_COLUMN}/${columnId}`, name);
  }

  public deleteColumn(boardId: string, columnId: string): Observable<any> {
    return this.httpClient.delete(`/${boardId}${URL_COLUMN}/${columnId}`);
  }

  public updateColumnOrder(boardId: string, dragColumns): Observable<IColumn[]> {
    return this.httpClient.put<IColumn[]>(`/${boardId}${URL_COLUMN}`, dragColumns)
  }

}
