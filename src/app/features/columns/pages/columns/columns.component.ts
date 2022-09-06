import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';

import { IBoards } from '@shared/interfaces/boards.interface';
import { TasksComponent } from '../../../tasks/pages/task/tasks.component';
import { NotificationType } from '@shared/enums';
import { ColumnsService } from '../../services/columns.service';
import { IColumn } from '@shared/interfaces';
import { NotificationService } from '@shared/services';
import { BoardsService } from '../../../boards/services/boards.service';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss'],
})

export class ColumnsComponent implements OnInit {

  public board: IBoards;
  public columns: IColumn[];
  public idBoard: string;
  public manageColumnItem: FormGroup;
  public addTaskItem: FormGroup;
  public toggleAddColumn: string = null;
  public toggleAddTask: string = null;
  public toggleEditColumn: string = null;
  public modalRef: MDBModalRef | null = null;

  constructor(private modalService: MDBModalService,
              private columnsService: ColumnsService,
              private boardsService: BoardsService,
              private route: ActivatedRoute,
              public fb: FormBuilder,
              private notificationService: NotificationService,
  ) {
  }

  ngOnInit() {
    this.columnManageForm();
    this.taskAddForm();
    this.idBoard = this.route.snapshot.paramMap.get('id');
    this.getBoard()
    this.getColumnById();
  }

  public columnManageForm(): void {
    this.manageColumnItem = this.fb.group({
      name: [null, Validators.required],
    });
  }

  public taskAddForm(): void {
    this.addTaskItem = this.fb.group({
      taskId: [''],
      taskName: [null, Validators.required],
      taskDesc: [''],
      taskTag: [[]],
      taskDate: [''],
      taskBackground: [''],
      taskUser: [[]],
    });
  }

  private getBoard(): void {
    this.boardsService.getBoardById(this.idBoard).pipe(take(1)).subscribe({
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

  private getColumnById(): void {
    this.columnsService.getColumnById(this.idBoard).pipe(take(1)).subscribe({
      next: (resp: IColumn[]) => {
        this.columns = resp;
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
    if (this.manageColumnItem.valid) {
      this.columnsService.createColumn(this.idBoard, name).pipe(take(1)).subscribe({
        next: (resp: IColumn) => {
          this.toggleAddColumn = null;
          this.manageColumnItem.reset();
          this.getColumnById();
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

  public updateColumn(name: string, idColumn: string, id = this.idBoard): void {
    if (this.manageColumnItem.valid) {
      this.columnsService.updateColumn(name, idColumn, id).pipe(take(1)).subscribe({
        next: (resp: IColumn) => {
          this.toggleEditColumn = null;
          this.manageColumnItem.reset();
          this.getColumnById();
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

  public deleteColumn(name: string, idColumn: string, id = this.idBoard): void {
    this.columnsService.deleteColumn(idColumn, id).pipe(take(1)).subscribe({
      next: () => {
        this.getColumnById();
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

//todo need new methods for task drag and drop?
  public dragAndDrop(event: CdkDragDrop<any[]>): void {
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
    this.updateColumnOrder(event.container.data);
  }

  public updateColumnOrder(dragColumns, id = this.idBoard): void {
    this.columnsService.updateColumnOrder(dragColumns, id).pipe(take(1)).subscribe({
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
    this.manageColumnItem.reset();
  }

  public editColumnView(column): void {
    this.toggleAddColumn = null;
    this.toggleEditColumn = column.id;
    this.toggleAddTask = null;
    this.manageColumnItem.patchValue(column);
  }

  public editTaskView(id: string): void {
    this.toggleAddColumn = null;
    this.toggleEditColumn = null;
    this.toggleAddTask = id;
    this.scrollTaskList(id);
  }

  //todo think how to avoid setTimeout
  scrollTaskList(id: string): void {
    setTimeout(() => {
      let scrollElement: Element = document.getElementsByClassName(`task__container-${id}`)[0];
      scrollElement.scrollTop = scrollElement.scrollHeight + 87;
    }, 0)
  }

  public clearFormView(): void {
    this.toggleEditColumn = null;
    this.toggleAddColumn = null;
    this.toggleAddTask = null;
    this.manageColumnItem.reset();
    this.addTaskItem.reset();
  }

  addTask(board, idColumn): void {
    if (this.addTaskItem.valid) {
      this.toggleAddTask = null;
      // this.columnsService.addTask(board, idColumn, this.idBoard);
      this.addTaskItem.reset();
    }
  }

  public openTask(idBoard: string, idColumn: string, idTask: string): void {
    this.modalRef = this.modalService.show(TasksComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-dialog-centered modal-lg',
      animated: true,
      data: {
        idTask,
        idColumn,
        idBoard,
      },
    });
    this.modalRef.content.actionAdd.pipe(take(1)).subscribe((columns: IBoards) => {
      //   this.boardsService.addBoard(columns);
    });
  }
}
