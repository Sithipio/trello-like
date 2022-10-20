import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalService } from 'angular-bootstrap-md';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { DataUpdateService, TagsService, TasksService } from '../../services';
import { NotificationService } from '@shared/services';
import { ITag, ITask } from '@shared/models';
import { TaskCoverComponent } from '../task-cover/task-cover.component';
import { TaskTagComponent } from '../task-tag/task-tag.component';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: [
    './tasks.component.scss',
  ],
})

export class TasksComponent implements OnInit, OnDestroy {

  public boardId: string;
  public taskId: string;
  public taskForm: FormGroup;
  public task: ITask;
  public tagsByBoard: ITag[];
  public toggleEditTaskName: string = null;
  public toggleEditTaskDesc: string = null;
  private _backgroundSub = new Subscription;
  private _tagSub = new Subscription;
  public datePickerValue: Date;
  public datePickerMinDate: Date = new Date();
  public datePickerConfig = {
    containerClass: 'theme-green',
    adaptivePosition: true,
    selectFromOtherMonth: true,
    todayPosition: 'center',
  };
  public dateCustomClasses: DatepickerDateCustomClasses[];
  @ViewChild('textAreaDesc') textAreaDesc: ElementRef;

  constructor(private fb: FormBuilder,
              private modalService: MDBModalService,
              private tasksService: TasksService,
              private dataUpdateService: DataUpdateService,
              private tagService: TagsService,
              private notificationService: NotificationService,
              private router: Router,
  ) {
    this.datePickerMinDate.setDate(this.datePickerMinDate.getDate() - 10);
    this.dateCustomClasses = [
      { date: new Date(), classes: ['current-date'] },
    ];
  }

  ngOnInit() {
    this.createTaskForm();
    this.getTaskById();
    this.getTagsByBoardId();
    this.subscribeOnUpdateTaskBackground();
    this.subscribeOnUpdateTaskTag();
  }

  private subscribeOnUpdateTaskBackground(): void {
    this._backgroundSub = this.dataUpdateService.getUpdateBackground().subscribe({
        next: (background) => {
          this.task.background = background;
          this.taskForm.patchValue({ background });
        },
      },
    );
  }

  private subscribeOnUpdateTaskTag(): void {
    this._tagSub = this.dataUpdateService.getUpdateTagsByBoard().subscribe({
        next: () => {
          this.getTaskById();
          this.getTagsByBoardId();
        },
      },
    );
  }

  private createTaskForm(): void {
    this.taskForm = this.fb.group({
      'name': ['', Validators.required],
      'description': [''],
      'tag': [''],
      'background': [''],
      'user': [],
    });
  }

  public trackByFn(index, item) {
    return item.id;
  }

  private getTaskById(): void {
    this.tasksService.getTask(this.boardId, this.taskId).subscribe({
      next: (resp: ITask) => {
        this.task = resp;
        this.taskForm.patchValue(this.task);
        this.dataUpdateService.sendUpdateTagsByTask(this.task);
        this.datePickerValue = new Date(this.task.date);
      },
      error: ({ error }) => {
        this.notificationService.sendMessages(error);
      },
    });
  }

  private getTagsByBoardId(): void {
    this.tagService.getTags(this.boardId).subscribe({
      next: (resp: ITag[]) => {
        this.tagsByBoard = resp;
      },
      error: ({ error }) => {
        this.notificationService.sendMessages(error);
      },
    });
  }

  public onUpdateTaskName(name: string): void {
    this.tasksService.updateTaskName(this.boardId, this.taskId, name).subscribe({
      next: () => {
        this.dataUpdateService.sendUpdateTaskId(this.taskId);
        this.taskForm.patchValue({ name: name });
        this.onClearFormView();
      },
      error: ({ error }) => {
        this.notificationService.sendMessages(error);
      },
    });
  }

  public onUpdateTaskDescription(description: string): void {
    if (!description) description = '';
    this.tasksService.updateTaskDescription(this.boardId, this.taskId, description).subscribe({
      next: () => {
        this.dataUpdateService.sendUpdateTaskId(this.taskId);
        this.task.description = description;
        this.taskForm.patchValue({ description: description });
        this.backTaskDescription();
      },
      error: ({ error }) => {
        this.notificationService.sendMessages(error);
      },
    });
  }

  public onUpdateTaskDate(date?: Date) {
    if (date.getFullYear() >= this.datePickerMinDate.getFullYear()) {
      this.tasksService.updateTaskDate(this.boardId, this.taskId, date).subscribe({
        next: () => {
          this.dataUpdateService.sendUpdateTaskId(this.taskId);
          this.task.date = date;
        },
        error: ({ error }) => {
          this.notificationService.sendMessages(error);
        },
      });
    }
  }

  public onDeleteTaskDate() {
      this.tasksService.updateTaskDate(this.boardId, this.taskId, null).subscribe({
        next: () => {
          this.dataUpdateService.sendUpdateTaskId(this.taskId);
          this.task.date = null;
          this.datePickerValue = null;
        },
        error: ({ error }) => {
          this.notificationService.sendMessages(error);
        },
      });
  }

  private backTaskDescription(): void {
    this.toggleEditTaskName = null;
    this.toggleEditTaskDesc = null;
  }

  public onClearFormView(): void {
    if (this.toggleEditTaskName) {
      this.onUpdateTaskName(this.taskForm.value.name);
    }
    this.toggleEditTaskName = null;
    this.toggleEditTaskDesc = null;
  }

  public onToggleBtnTaskName(taskId: string): void {
    this.toggleEditTaskName = taskId;
    this.toggleEditTaskDesc = null;
  }

  public onToggleBtnTaskDesc(taskId: string): void {
    this.taskForm.patchValue({ description: this.task.description });
    this.toggleEditTaskDesc = taskId;
    this.toggleEditTaskName = null;
  }

  public onOpenCover(): void {
    this.modalService.show(TaskCoverComponent, {
      backdrop: false,
      keyboard: false,
      focus: true,
      show: true,
      ignoreBackdropClick: false,
      class: 'modal-dialog-centered modal-lg',
      animated: true,
      data: {
        boardId: this.boardId,
        taskId: this.taskId,
        background: this.task.background,
      },
    });
  }

  public onOpenTags(operationTag: string, tag?: ITag): void {
    this.modalService.show(TaskTagComponent, {
      backdrop: false,
      keyboard: false,
      focus: true,
      show: true,
      ignoreBackdropClick: false,
      class: 'modal-dialog-centered modal-lg',
      animated: true,
      data: {
        boardId: this.boardId,
        taskId: this.taskId,
        tags: this.task.tag,
        background: this.task.background,
        operationTag,
        tag,
      },
    });
  }

  public onCloseTask(): void {
    this.modalService.hide(1);
  }

  public ngOnDestroy(): void {
    this.router.navigate([{ outlets: { task: null } }]);
    this._backgroundSub.unsubscribe();
    this._tagSub.unsubscribe();
  }

}
