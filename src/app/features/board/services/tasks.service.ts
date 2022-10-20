import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITask } from '@shared/models';
import { URL_TASK } from '@shared/constant';

@Injectable({
  providedIn: 'root',
})
export class TasksService {

  constructor(private httpClient: HttpClient) {
  }

  public getTasks(boardId: string): Observable<ITask[]> {
    return this.httpClient.get<ITask[]>(`/${boardId}${URL_TASK}`);
  }

  public getTask(boardId: string, taskId: string): Observable<ITask> {
    return this.httpClient.get<ITask>(`/${boardId}${URL_TASK}/${taskId}`);
  }

  public createTask(boardId: string, columnId: string, name: string): Observable<ITask> {
    return this.httpClient.post<ITask>(`/${boardId}${URL_TASK}/${columnId}`, name);
  }

  public updateTaskName(boardId: string, taskId: string, name: string): Observable<ITask> {
    return this.httpClient.patch<ITask>(`/${boardId}${URL_TASK}/${taskId}/name`, { name });
  }

  public updateTaskBackground(boardId: string, taskId: string, background: string): Observable<ITask> {
    return this.httpClient.patch<ITask>(`/${boardId}${URL_TASK}/${taskId}/background`, { background });
  }

  public updateTaskDescription(boardId: string, taskId: string, description: string): Observable<ITask> {
    return this.httpClient.patch<ITask>(`/${boardId}${URL_TASK}/${taskId}/description`, { description });
  }

  public updateTaskDate(boardId: string, taskId: string, date: Date): Observable<ITask> {
    return this.httpClient.patch<ITask>(`/${boardId}${URL_TASK}/${taskId}/date`,  {date} );
  }

  public updateTaskOrder(boardId: string, columnId: string, dragColumns): Observable<ITask[]> {
    return this.httpClient.put<ITask[]>(`/${boardId}${URL_TASK}`, dragColumns);
  }

}

