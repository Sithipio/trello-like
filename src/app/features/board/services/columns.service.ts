import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IColumn } from '@shared/models';
import { URL_COLUMN } from '@shared/constant';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {

  constructor(private httpClient: HttpClient) {
  }

  public getColumnById(boardId: string): Observable<IColumn[]> {
    return this.httpClient.get<IColumn[]>(`/${boardId}${URL_COLUMN}`);
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
    return this.httpClient.put<IColumn[]>(`/${boardId}${URL_COLUMN}`, dragColumns);
  }

}
