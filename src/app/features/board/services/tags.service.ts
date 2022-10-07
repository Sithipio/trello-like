import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITag } from '@shared/models';
import { URL_TAG } from '@shared/constant';

@Injectable({
  providedIn: 'root',
})
export class TagsService {

  constructor(private httpClient: HttpClient) {
  }

  public getTagsByBoardId(boardId: string): Observable<ITag[]> {
    return this.httpClient.get<ITag[]>(`/${boardId}${URL_TAG}`);
  }

  public createDefaultTags(boardId: string): Observable<any> {
    return this.httpClient.put<any>(`/${boardId}${URL_TAG}`, boardId);
  }

  public createTagByBoardId(boardId: string, dataTag: ITag): Observable<ITag> {
    return this.httpClient.post<ITag>(`/${boardId}${URL_TAG}`, dataTag);
  }

}
