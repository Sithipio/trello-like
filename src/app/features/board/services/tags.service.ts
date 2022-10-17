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

  public getTags(boardId: string): Observable<ITag[]> {
    return this.httpClient.get<ITag[]>(`/${boardId}${URL_TAG}`);
  }

  public getTag(boardId: string, tagId: string): Observable<ITag[]> {
    return this.httpClient.get<ITag[]>(`/${boardId}${URL_TAG}/${tagId}`);
  }

  public createTag(boardId: string, dataTag: ITag): Observable<ITag> {
    return this.httpClient.post<ITag>(`/${boardId}${URL_TAG}`, dataTag);
  }

  public createDefaultTags(boardId: string): Observable<ITag> {
    return this.httpClient.put<ITag>(`/${boardId}${URL_TAG}`, {boardId});
  }

  public updateTag(boardId: string, tag: ITag): Observable<ITag> {
    return this.httpClient.patch<ITag>(`/${boardId}${URL_TAG}/${tag.id}`, tag);
  }

  public toggleOnTagToTask(boardId: string, tagId: string, taskId: string): Observable<ITag> {
    return this.httpClient.put<ITag>(`/${boardId}${URL_TAG}/${tagId}/On`, {taskId});
  }

  public toggleOffTagToTask(boardId: string, tagId: string, taskId: string): Observable<ITag> {
    return this.httpClient.put<ITag>(`/${boardId}${URL_TAG}/${tagId}/Off`, {taskId});
  }

  public deleteTagByBoardId(boardId: string, tagId: string): Observable<ITag> {
    return this.httpClient.delete<ITag>(`/${boardId}${URL_TAG}/${tagId}`);
  }

}
