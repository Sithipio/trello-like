import {
  Component,
  ElementRef, OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subscription, take } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router';

import { BoardsService } from '@core/services/boards.service';
import { TAG_BG_COLOR } from '@shared/constant';
import { NotificationType } from '@shared/enums';
import { DataUpdateService, TagsService, TasksService } from '../../services';
import { NotificationService } from '@shared/services';
import { ITag, ITask } from '@shared/interfaces';
import { TaskCoverComponent } from '../task-cover/task-cover.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})

export class TasksComponent implements OnInit, OnDestroy {

  private boardId: string;
  public taskId: string;
  public taskForm: FormGroup;
  public editTagForm: FormGroup;
  public task: ITask;
  public tagsByBoard: ITag[];
  public bgTag = TAG_BG_COLOR;
  public toggleEditTaskName: string = null;
  public toggleEditTaskDesc: string = null;
  public toggleEditTag: string = null;
  private watcher = new Subscription;
  public modalRef: MDBModalRef | null = null;
  @ViewChild('textAreaDesc') textAreaDesc: ElementRef;

  constructor(public fb: FormBuilder,
              private modalService: MDBModalService,
              private boardsService: BoardsService,
              private tasksService: TasksService,
              private dataUpdateService: DataUpdateService,
              private tagService: TagsService,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.createTaskForm();
    this.getTagsByBoardId();
    this.getTaskById();
    //  this.getTagsByTaskId();
    this.subscribeOnUpdateTaskData()
  }

  private subscribeOnUpdateTaskData(): void {
    this.watcher = this.dataUpdateService.getUpdateTaskData().subscribe({
        next: (background) => {
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

  public createTagByBoardId(dataTag: ITag): void {
    this.tagService.createTagByBoardId(this.boardId, dataTag).pipe(take(1)).subscribe({
      next: () => {
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

  toggleTags(event, index) {
    if (event.target.checked) {
      this.taskForm.value.taskTag.push(this.tagsByBoard[index]);
      //   this.getTag();
    } else {
      this.taskForm.value.taskTag = this.taskForm.value.taskTag.filter(item => item.tagId != index);
    }
  }

  toggleBtnEditTag(tagId?, tagLength?) {

    if (this.toggleEditTag) {
      this.toggleEditTag = null;
    } else {
      this.toggleEditTag = tagId;
      //  this.editTagForm.patchValue(this.boardsService.getTag(tagId))
    }
    if (tagLength) {
      this.toggleEditTag = tagLength;
      this.toggleEditTag = tagLength.toString();
      this.editTagForm.reset();
    }
  }

  addTag(form) {
    // this.boardsService.addTag(form);
    // this.getTag();
  }


  editTag(form) {
    //   this.boardsService.editTag(form);
    //   this.getTag();
  }

  deleteTag(id) {
    //  this.boardsService.deleteTag(id);
    // this.getTag();
  }

  checkTagActive(itemId, idTask) {
    return true;
//    return this.boardsService.checkTagActive(itemId, idTask, this.idBoard, this.idColumn);
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

  public closeTask(): void {
    this.modalService.hide(1);
  }

  public ngOnDestroy(): void {
    this.router.navigate([{outlets: {task: null}}]);
    this.watcher.unsubscribe();
  }
}
