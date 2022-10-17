import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataUpdateService {
  private subjectTaskId$ = new Subject<string>();
  private subjectBackground$ = new Subject<string>();
  private subjectTagByBoard$ = new Subject<any>();
  private subjectTagByTask$ = new Subject<any>();

  public sendUpdateTaskId(taskId: string) {
    this.subjectTaskId$.next(taskId);
  }

  public getUpdateTaskId(): Observable<any> {
    return this.subjectTaskId$.asObservable();
  }

  public sendUpdateBackground(background: string) {
    this.subjectBackground$.next(background);
  }

  public getUpdateBackground(): Observable<any> {
    return this.subjectBackground$.asObservable();
  }

  public sendUpdateTagsByBoard(toggleTag: {}) {
    this.subjectTagByBoard$.next(toggleTag);
  }

  public getUpdateTagsByBoard(): Observable<any> {
    return this.subjectTagByBoard$.asObservable();
  }

  public sendUpdateTagsByTask(task: {}) {
    this.subjectTagByTask$.next(task);
  }

  public getUpdateTagsByTask(): Observable<any> {
    return this.subjectTagByTask$.asObservable();
  }
}
