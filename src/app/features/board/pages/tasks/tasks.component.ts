import {Component, ElementRef, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {Subscription, take} from 'rxjs'
import {Router} from '@angular/router';

import {NotificationType} from '@shared/enums';
import {DataUpdateService, TagsService, TasksService} from '../../services';
import {NotificationService} from '@shared/services';
import {ITag, ITask} from '@shared/interfaces';
import {TaskCoverComponent} from '../task-cover/task-cover.component';
import {TaskTagComponent} from '../task-tag/task-tag.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: [
    '../../../../styles/modal.scss',
    './tasks.component.scss',
  ],
})

export class TasksComponent implements OnInit, OnDestroy {

  private boardId: string;
  public taskId: string;
  public taskForm: FormGroup;
  public editTagForm: FormGroup;
  public task: ITask;
  public tagsByBoard: ITag[];
  public toggleEditTaskName: string = null;
  public toggleEditTaskDesc: string = null;
  public toggleEditTaskTag: string = null;
  private watcher = new Subscription;
  public modalRef: MDBModalRef | null = null;
  @ViewChild('textAreaDesc') textAreaDesc: ElementRef;

  constructor(public fb: FormBuilder,
              private modalService: MDBModalService,
              private tasksService: TasksService,
              private dataUpdateService: DataUpdateService,
              private tagService: TagsService,
              private notificationService: NotificationService,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.createTaskForm();
    this.getTaskById();
    this.getTagsByBoardId();
    this.subscribeOnUpdateTaskData();
    console.log(this.tagsByBoard)
  }

  private subscribeOnUpdateTaskData(): void {
    this.watcher = this.dataUpdateService.getUpdateTaskData().subscribe({
        next: (background) => {
          this.task.background = background;
          this.taskForm.patchValue({background})
        },
      },
    );
  }

  private createTaskForm(): void {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      tag: [''],
      date: [''],
      background: [''],
      user: [],
    });
  }

  private getTaskById(): void {
    this.tasksService.getTask(this.boardId, this.taskId).pipe(take(1)).subscribe({
      next: (resp: ITask) => {
        this.task = resp;
        this.taskForm.patchValue(this.task);
        console.log(this.task)
      },
      error: ({error}) => {
        this.notificationService.sendMessage({
          title: error.error,
          message: error.message,
          type: NotificationType.ERROR,
        });
      },
    });
  }

  private getTagsByBoardId(): void {
    this.tagService.getTagsByBoardId(this.boardId).pipe(take(1)).subscribe({
      next: (resp: ITag[]) => {
        this.tagsByBoard = resp;
      },
      error: ({error}) => {
        this.notificationService.sendMessage({
          title: error.error,
          message: error.message,
          type: NotificationType.ERROR,
        });
      },
    });
  }

  public updateTaskName(name: string): void {
    this.tasksService.updateTaskName(this.boardId, this.taskId, name).pipe(take(1)).subscribe({
      next: () => {
        this.dataUpdateService.sendUpdateTaskId(this.taskId);
        this.taskForm.patchValue({name: name});
        this.clearFormView();
      },
      error: ({error}) => {
        this.notificationService.sendMessage({
          title: error.error,
          message: error.message,
          type: NotificationType.ERROR,
        });
      },
    });
  }

  public updateTaskDescription(description: string): void {
    if (!description) description = '';
    this.tasksService.updateTaskDescription(this.boardId, this.taskId, description).pipe(take(1)).subscribe({
      next: () => {
        this.dataUpdateService.sendUpdateTaskId(this.taskId);
        this.task.description = description;
        this.taskForm.patchValue({description: description});
        this.backTaskDescription();
      },
      error: ({error}) => {
        this.notificationService.sendMessage({
          title: error.error,
          message: error.message,
          type: NotificationType.ERROR,
        });
      },
    });
  }

  public backTaskDescription(): void {
    this.toggleEditTaskName = null;
    this.toggleEditTaskDesc = null;
  }

  public clearFormView(): void {
    if (this.toggleEditTaskName) {
      this.updateTaskName(this.taskForm.value.name);
    }
    this.toggleEditTaskName = null;
    this.toggleEditTaskDesc = null;
  }

  public toggleBtnTaskName(taskId: string): void {
    this.toggleEditTaskName = taskId;
    this.toggleEditTaskDesc = null;
  }

  public toggleBtnTaskDesc(taskId: string): void {
    this.taskForm.patchValue({description: this.task.description});
    this.toggleEditTaskDesc = taskId;
    this.toggleEditTaskName = null;
  }

  toggleBtnEditTag(tagId?, tagLength?) {

    if (this.toggleEditTaskTag) {
      this.toggleEditTaskTag = null;
    } else {
      this.toggleEditTaskTag = tagId;
      //  this.editTagForm.patchValue(this.boardsService.getTag(tagId))
    }
    if (tagLength) {
      this.toggleEditTaskTag = tagLength;
      this.toggleEditTaskTag = tagLength.toString();
      this.editTagForm.reset();
    }
  }

  public openCover(): void {
    this.modalRef = this.modalService.show(TaskCoverComponent, {
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

  public openTags(): void {
    this.modalRef = this.modalService.show(TaskTagComponent, {
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
        tagsByBoard: this.tagsByBoard,
        background: this.task.background,
      },
    });
  }

  public closeTask(): void {
    this.modalService.hide(1);
  }

  public ngOnDestroy(): void {
    this.router.navigate([{outlets: {task: null}}]);
    this.watcher.unsubscribe();
  }
}
