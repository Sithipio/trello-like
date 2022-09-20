import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataUpdateService {
  private subjectId$ = new Subject<string>();
  private subjectData$ = new Subject<string>();

  public sendUpdateTaskId(taskId: string) {
    this.subjectId$.next(taskId);
  }

  public getUpdateTaskId(): Observable<any> {
    return this.subjectId$.asObservable();
  }

  public sendUpdateTaskData(data: string) {
    this.subjectData$.next(data);
  }

  public getUpdateTaskData(): Observable<any> {
    return this.subjectData$.asObservable();
  }

}
