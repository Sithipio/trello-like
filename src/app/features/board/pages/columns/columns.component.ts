import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';

import { IBoards } from '@shared/interfaces/boards.interface';
import { TasksComponent } from '../tasks/tasks.component';
import { NotificationType } from '@shared/enums';
import { ColumnsService } from '../../services/columns.service';
import { IColumn, ITask } from '@shared/interfaces';
import { NotificationService } from '@shared/services';
import { BoardsService } from '../../../boards/services/boards.service';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-board',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss'],
})

export class ColumnsComponent implements OnInit {

  public board: IBoards;
  public columns: IColumn[];
  public tasks: { [key: string]: ITask[] } = {};
  public column = [];
  public columnItemForm: FormGroup;
  public addTaskItemForm: FormGroup;
  public toggleAddColumn: string = null;
  public toggleAddTask: string = null;
  public toggleEditColumn: string = null;
  public modalRef: MDBModalRef | null = null;
  private readonly _boardId: string = this.route.snapshot.paramMap.get('boardId');

  constructor(private modalService: MDBModalService,
              private columnsService: ColumnsService,
              private boardsService: BoardsService,
              private tasksService: TasksService,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              public fb: FormBuilder,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.createColumnForm();
    this.createAddTaskForm();
    this.getBoard()
    this.getColumnsById();
    this.openModalTask()
  }

  private createColumnForm(): void {
    this.columnItemForm = this.fb.group({
      name: [null, Validators.required],
    });
  }

  private createAddTaskForm(): void {
    this.addTaskItemForm = this.fb.group({
      name: [null, Validators.required],
    });
  }

  private getBoard(): void {
    this.boardsService.getBoardById(this._boardId).pipe(take(1)).subscribe({
      next: (resp: IBoards) => {
        this.board = resp;
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

  private getColumnsById(): void {
    this.columnsService.getColumnById(this._boardId).pipe(take(1)).subscribe({
      next: (resp: IColumn[]) => {
        this.columns = resp;
        resp.forEach((item, index) => this.column[index] = item.id)
        this.getTasksById();
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

  public createColumn(name: string): void {
    if (this.columnItemForm.valid) {
      this.columnsService.createColumn(this._boardId, name).pipe(take(1)).subscribe({
        next: (resp: IColumn) => {
          this.toggleAddColumn = null;
          this.columnItemForm.reset();
          this.getColumnsById();
          this.notificationService.sendMessage({
            message: `Column with name "${resp.name}" created`,
            type: NotificationType.SUCCESS,
          });
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
  }

  public updateColumn(name: string, columnId: string): void {
    if (this.columnItemForm.valid) {
      this.columnsService.updateColumn(this._boardId, columnId, name).pipe(take(1)).subscribe({
        next: (resp: IColumn) => {
          this.toggleEditColumn = null;
          this.columnItemForm.reset();
          this.getColumnsById();
          this.notificationService.sendMessage({
            message: `Column with name "${resp.name}" updated`,
            type: NotificationType.SUCCESS,
          });
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
  }

  public deleteColumn(name: string, columnId: string): void {
    this.columnsService.deleteColumn(this._boardId, columnId).pipe(take(1)).subscribe({
      next: () => {
        this.getColumnsById();
        this.notificationService.sendMessage({
          message: `Column with name "${name}" deleted`,
          type: NotificationType.INFO,
        });
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

  public dragAndDropColumn(event: CdkDragDrop<any[]>): void {
    this.dragAndDrop(event);
    this.updateColumnOrder(event.container.data);
  }

  public dragAndDropTask(columnId: string, event: CdkDragDrop<any[]>): void {
    this.dragAndDrop(event);
    event.container.data.forEach(item => item.columnId = columnId);
    this.updateTaskOrder(columnId, event.container.data)
  }

  private dragAndDrop(event: CdkDragDrop<any[]>): void {
    if (event.container === event.previousContainer) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex)
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  private updateColumnOrder(dragColumns): void {
    this.columnsService.updateColumnOrder(this._boardId, dragColumns).pipe(take(1)).subscribe({
      next: () => {
        this.getColumnsById();
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

  public addColumnView(): void {
    this.toggleAddColumn = 'true';
    this.toggleEditColumn = null;
    this.toggleAddTask = null;
    this.columnItemForm.reset();
  }

  public editColumnView(column: IColumn): void {
    this.toggleAddColumn = null;
    this.toggleEditColumn = column.id;
    this.toggleAddTask = null;
    this.columnItemForm.patchValue(column);
  }

  public editTaskView(columnId: string): void {
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
    }, 0)
  }

  public clearFormView(): void {
    this.toggleEditColumn = null;
    this.toggleAddColumn = null;
    this.toggleAddTask = null;
    this.columnItemForm.reset();
    this.addTaskItemForm.reset();
  }

  private getTasksById(columnId?: string): void {
    this.tasksService.getTasks(this._boardId).pipe(take(1)).subscribe({
      next: (resp: ITask[]) => {
        this.column.forEach(columnId => {
          this.tasks[columnId] = resp.filter(task => task.columnId === columnId)
        })
        if (columnId) {
          this.scrollTaskList(columnId)
        }
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

  private updateTaskOrder(columnId: string, dragTasks): void {
    this.tasksService.updateTaskOrder(this._boardId, columnId, dragTasks).pipe(take(1)).subscribe({
      next: () => {
        this.getTasksById();
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

  public addTask(name: string, columnId: string): void {
    if (this.addTaskItemForm.valid) {
      this.tasksService.createTask(this._boardId, columnId, name).pipe(take(1)).subscribe({
        next: (resp: ITask) => {
          this.toggleAddTask = null;
          this.addTaskItemForm.reset();
          this.getTasksById(columnId);
          this.notificationService.sendMessage({
            message: `Task with name "${resp.name}" created`,
            type: NotificationType.SUCCESS,
          });
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
  }

  public openModalTask(taskId?: string): void {
    const urlWithoutAuxiliaryRoute = this.router
      .createUrlTree(['.'], {relativeTo: this.route})
      .root.children['task']?.toString();

    if (taskId) {
      this.router.navigate([{outlets: {task: taskId}, relativeTo: this.router}])
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
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-dialog-centered modal-lg',
      animated: true,
      data: {
        taskId,
        boardId: this._boardId,
      },
    });
    /*  this.modalRef.content.actionAdd.pipe(take(1)).subscribe((board: IBoards) => {
           this.boardsService.addBoard(board);
      });*/
  }
}
