import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { IBoards } from '@shared/models/boards.model';
import { TasksComponent } from '../tasks/tasks.component';
import { NotificationType } from '@shared/enums';
import { IColumn, ITask } from '@shared/models';
import { NotificationService } from '@shared/services';
import { BoardsService } from '../../../boards/services/boards.service';
import { ColumnsService, DataUpdateService, TasksService } from '../../services';

@Component({
  selector: 'app-board',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss'],
})

export class ColumnsComponent implements OnInit, OnDestroy {

  public board: IBoards;
  public columns: IColumn[];
  public tasks: { [key: string]: ITask[] } = {};
  public column = [];
  public columnItemForm: FormGroup;
  public taskItemForm: FormGroup;
  public toggleAddColumn: string = null;
  public toggleAddTask: string = null;
  public toggleEditColumn: string = null;
  public modalRef: MDBModalRef | null = null;
  private readonly _boardId: string = this.route.snapshot.paramMap.get('boardId');
  private watcher = new Subscription;

  constructor(private modalService: MDBModalService,
              private columnsService: ColumnsService,
              private boardsService: BoardsService,
              private tasksService: TasksService,
              private dataUpdateService: DataUpdateService,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              public fb: FormBuilder,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.createColumnForm();
    this.createTaskForm();
    this.getBoard();
    this.getColumnsById();
    this.subscribeOnUpdateTask();
    this.onOpenModalTask();
  }

  private subscribeOnUpdateTask(): void {
    this.watcher = this.dataUpdateService.getUpdateTaskId().subscribe({
        next: (taskId) => {
          this.getTaskById(taskId);
        },
      },
    );
  }

  private createColumnForm(): void {
    this.columnItemForm = this.fb.group({
      'name': [null, Validators.required],
    });
  }

  private createTaskForm(): void {
    this.taskItemForm = this.fb.group({
      'name': [null, Validators.required],
    });
  }

  private getBoard(): void {
    this.boardsService.getBoardById(this._boardId).subscribe({
      next: (resp: IBoards) => {
        this.board = resp;
      },
      error: ({ error }) => {
        this.notificationService.sendMessage({
          title: error.error,
          message: error.message,
          type: NotificationType.ERROR,
        });
      },
    });
  }

  private getColumnsById(): void {
    this.columnsService.getColumnById(this._boardId).subscribe({
      next: (resp: IColumn[]) => {
        this.columns = resp;
        resp.forEach((item, index) => this.column[index] = item.id);
        this.getTasksById();
      },
      error: ({ error }) => {
        this.notificationService.sendMessage({
          title: error.error,
          message: error.message,
          type: NotificationType.ERROR,
        });
      },
    });
  }

  public onCreateColumn(name: string): void {
    if (this.columnItemForm.valid) {
      this.columnsService.createColumn(this._boardId, name).subscribe({
        next: (resp: IColumn) => {
          this.toggleAddColumn = null;
          this.columnItemForm.reset();
          this.getColumnsById();
          this.notificationService.sendMessage({
            message: `Column with name "${resp.name}" created`,
            type: NotificationType.SUCCESS,
          });
        },
        error: ({ error }) => {
          this.notificationService.sendMessage({
            title: error.error,
            message: error.message,
            type: NotificationType.ERROR,
          });
        },
      });
    }
  }

  public onUpdateColumn(name: string, columnId: string): void {
    if (this.columnItemForm.valid) {
      this.columnsService.updateColumn(this._boardId, columnId, name).subscribe({
        next: (resp: IColumn) => {
          this.toggleEditColumn = null;
          this.columnItemForm.reset();
          this.getColumnsById();
          this.notificationService.sendMessage({
            message: `Column with name "${resp.name}" updated`,
            type: NotificationType.SUCCESS,
          });
        },
        error: ({ error }) => {
          this.notificationService.sendMessage({
            title: error.error,
            message: error.message,
            type: NotificationType.ERROR,
          });
        },
      });
    }
  }

  public onDeleteColumn(name: string, columnId: string): void {
    this.columnsService.deleteColumn(this._boardId, columnId).subscribe({
      next: () => {
        this.getColumnsById();
        this.notificationService.sendMessage({
          message: `Column with name "${name}" deleted`,
          type: NotificationType.INFO,
        });
      },
      error: ({ error }) => {
        this.notificationService.sendMessage({
          title: error.error,
          message: error.message,
          type: NotificationType.ERROR,
        });
      },
    });
  }

  public onDragAndDropColumn(event: CdkDragDrop<any[]>): void {
    this.dragAndDrop(event);
    this.updateColumnOrder(event.container.data);
  }

  public onDragAndDropTask(columnId: string, event: CdkDragDrop<any[]>): void {
    this.dragAndDrop(event);
    event.container.data.forEach(item => item.columnId = columnId);
    this.updateTaskOrder(columnId, event.container.data);
  }

  private dragAndDrop(event: CdkDragDrop<any[]>): void {
    if (event.container === event.previousContainer) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  private updateColumnOrder(dragColumns): void {
    this.columnsService.updateColumnOrder(this._boardId, dragColumns).subscribe({
      next: () => {
        this.getColumnsById();
      },
      error: ({ error }) => {
        this.notificationService.sendMessage({
          title: error.error,
          message: error.message,
          type: NotificationType.ERROR,
        });
      },
    });
  }

  public onAddColumnView(): void {
    this.toggleAddColumn = 'true';
    this.toggleEditColumn = null;
    this.toggleAddTask = null;
    this.columnItemForm.reset();
  }

  public onEditColumnView(column: IColumn): void {
    this.toggleAddColumn = null;
    this.toggleEditColumn = column.id;
    this.toggleAddTask = null;
    this.columnItemForm.patchValue(column);
  }

  public onEditTaskView(columnId: string): void {
    this.toggleAddColumn = null;
    this.toggleEditColumn = null;
    this.toggleAddTask = columnId;
    this.scrollTaskList(columnId);
  }

  //todo think how to avoid setTimeout, read about setTimeout
  private scrollTaskList(columnId?: string): void {
    setTimeout(() => {
      let scrollElement: Element = document.getElementsByClassName(`task__container-${columnId}`)[0];
      scrollElement.scrollTop = scrollElement.scrollHeight + 87;
    }, 0);
  }

  public onClearFormView(): void {
    this.toggleEditColumn = null;
    this.toggleAddColumn = null;
    this.toggleAddTask = null;
    this.columnItemForm.reset();
    this.taskItemForm.reset();
  }

  private getTasksById(columnId?: string): void {
    this.tasksService.getTasks(this._boardId).subscribe({
      next: (resp: ITask[]) => {
        this.column.forEach(columnId => {
          this.tasks[columnId] = resp.filter(task => task.column === columnId);
        });
        if (columnId) {
          this.scrollTaskList(columnId);
        }
      },
      error: ({ error }) => {
        this.notificationService.sendMessage({
          title: error.error,
          message: error.message,
          type: NotificationType.ERROR,
        });
      },
    });
  }

  private getTaskById(taskId: string): void {
    this.tasksService.getTask(this._boardId, taskId).subscribe({
      next: (resp: ITask) => {
        this.tasks[resp.column].forEach(item => {
          if (item.id === taskId) {
            item.name = resp.name;
            item.background = resp.background;
          }
        });
      },
      error: ({ error }) => {
        this.notificationService.sendMessage({
          title: error.error,
          message: error.message,
          type: NotificationType.ERROR,
        });
      },
    });
  }

  private updateTaskOrder(columnId: string, dragTasks): void {
    this.tasksService.updateTaskOrder(this._boardId, columnId, dragTasks).subscribe({
      next: () => {
        this.getTasksById();
      },
      error: ({ error }) => {
        this.notificationService.sendMessage({
          title: error.error,
          message: error.message,
          type: NotificationType.ERROR,
        });
      },
    });
  }

  public onAddTask(name: string, columnId: string): void {
    if (this.taskItemForm.valid) {
      this.tasksService.createTask(this._boardId, columnId, name).subscribe({
        next: (resp: ITask) => {
          this.toggleAddTask = null;
          this.taskItemForm.reset();
          this.getTasksById(columnId);
          this.notificationService.sendMessage({
            message: `Task with name "${resp.name}" created`,
            type: NotificationType.SUCCESS,
          });
        },
        error: ({ error }) => {
          this.notificationService.sendMessage({
            title: error.error,
            message: error.message,
            type: NotificationType.ERROR,
          });
        },
      });
    }
  }

  public onOpenModalTask(taskId?: string): void {
    const urlWithoutAuxiliaryRoute = this.router
      .createUrlTree(['.'], { relativeTo: this.route })
      .root.children['task']?.toString();

    if (taskId) {
      this.router.navigate([{ outlets: { task: taskId }, relativeTo: this.router }]);
      this.openTask(taskId);
    } else if (urlWithoutAuxiliaryRoute) {
      this.openTask(urlWithoutAuxiliaryRoute);
    }
  }

  private openTask(taskId: string): void {
    this.modalRef = this.modalService.show(TasksComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true,
      ignoreBackdropClick: false,
      class: 'modal-dialog-centered modal-lg',
      animated: true,
      data: {
        taskId,
        boardId: this._boardId,
      },
    });
  }

  public ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

}
