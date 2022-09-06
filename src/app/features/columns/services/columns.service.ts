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
    return this.httpClient.get<IColumn[]>(`${URL_COLUMN}/${id}`);
  }

  public createColumn(id: string, name: string): Observable<IColumn> {
    return this.httpClient.post<IColumn>(`${URL_COLUMN}/${id}`, name);
  }

  public updateColumn(name: string, idColumn: string, id: string): Observable<IColumn> {
    return this.httpClient.patch<IColumn>(`${URL_COLUMN}/${id}/${idColumn}`, name);
  }

  public deleteColumn(idColumn: string, id: string): Observable<any> {
    return this.httpClient.delete(`${URL_COLUMN}/${id}/${idColumn}`);
  }

  public updateColumnOrder(dragColumns, id: string): Observable<IColumn[]> {
    return this.httpClient.put<IColumn[]>(`${URL_COLUMN}/${id}`, dragColumns)
  }

}
