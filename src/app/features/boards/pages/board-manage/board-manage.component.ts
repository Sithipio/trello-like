import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalService } from 'angular-bootstrap-md';
import { Subject, take } from 'rxjs';

import { BOARD_BG_COLOR } from '@shared/constant';
import { IBoards } from '@shared/interfaces';
import { BoardsService } from '../../services/boards.service';
import { BoardBackground, NotificationType } from '@shared/enums';
import { NotificationService } from '@shared/services';

@Component({
  selector: 'app-columns-manage',
  templateUrl: './board-manage.component.html',
  styleUrls: [
    '../../../../styles/font-styles.scss',
    './board-manage.component.scss',
  ],
})
export class BoardManageComponent implements OnInit {

  public idBoard: string;
  public isReady: boolean = false;
  public manageBoardForm: FormGroup;
  public actionManageBoard$ = new Subject<any>();
  public bgBoard = BOARD_BG_COLOR;
  public board: IBoards;
  public title: string;

  constructor(public fb: FormBuilder,
              private modalService: MDBModalService,
              private boardsService: BoardsService,
              private notificationService: NotificationService) {
  }

  public ngOnInit(): void {
    this.boardManageForm();

    if (this.idBoard) {
      this.getBoard();
    } else {
      this.title = 'Create a new columns';
      this.isReady = true;
    }
  }

  public boardManageForm(): void {
    this.manageBoardForm = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(15)]],
      background: [BoardBackground.GREY, Validators.required],
      isFavorite: [false],
    });
  }

  get getNameValueForm(): AbstractControl {
    return this.manageBoardForm.get('name');
  }

  private getBoard(): void {
    this.boardsService.getBoardById(this.idBoard).pipe(take(1)).subscribe({
      next: (resp: IBoards) => {
          this.board = resp;
        this.manageBoardForm.patchValue(this.board);
        this.title = `Edit board ${this.board.name}`;
        this.isReady = true;
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

  public addBoard(): void {
    if (this.manageBoardForm.invalid) {
      this.manageBoardForm.markAllAsTouched();
    } else if (this.manageBoardForm.valid) {
      this.boardsService.addBoard(this.manageBoardForm.value).pipe(take(1)).subscribe({
        next: (resp) => {
          this.actionManageBoard$.next(1);
          this.modalService.hide(1);
          this.notificationService.sendMessage({
            message: `Board with name "${resp.name}" created`,
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
      })
    }
  }

  public updateBoard(form): void {
    if (this.manageBoardForm.invalid) {
      this.manageBoardForm.markAllAsTouched();
    } else if (this.manageBoardForm.valid) {
      this.boardsService.updateBoard(this.idBoard, form).pipe(take(1)).subscribe({
        next: (resp) => {
          this.actionManageBoard$.next(1);
          this.modalService.hide(1);
          this.notificationService.sendMessage({
            message: `Board with name "${resp.name}" updated`,
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

  public deleteBoard(name): void {
    this.boardsService.deleteBoard(this.idBoard).pipe((take(1))).subscribe({
      next: () => {
        this.modalService.hide(1);
        this.actionManageBoard$.next(1);
        this.notificationService.sendMessage({
          message: `Board with name "${name}" deleted`,
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

  public closeBoard(): void {
    this.modalService.hide(1);
  }

}
