import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';

import { BOARD_BG_COLOR } from '@shared/constant';
import { IBoards } from '@shared/models';
import { BoardsService } from '../../services/boards.service';
import { BoardBackground, NotificationType } from '@shared/enums';
import { NotificationService } from '@shared/services';
import { TagsService } from '../../../board/services';

@Component({
  selector: 'app-board-manage',
  templateUrl: './board-manage.component.html',
  styleUrls: [
    '../../../../styles/_font-styles.scss',
    './board-manage.component.scss',
  ],
})
export class BoardManageComponent implements OnInit {

  public board: IBoards;
  public boardId: string;
  public boardBackground = BOARD_BG_COLOR;
  public title: string;
  public boardForm: FormGroup;
  public actionManageBoard$ = new Subject<any>();

  constructor(public fb: FormBuilder,
              private modalService: MDBModalService,
              private boardsService: BoardsService,
              private notificationService: NotificationService,
              private tagsService: TagsService,
  ) {
  }

  public ngOnInit(): void {
    this.createBoardForm();

    if (this.boardId) {
      this.getBoard();
    } else {
      this.title = 'Create a new board';
    }
  }

  private createBoardForm(): void {
    this.boardForm = this.fb.group({
      'name': ['', [Validators.required, Validators.maxLength(15)]],
      'background': [BoardBackground.GREY, Validators.required],
      'isFavorite': [false],
    });
  }

  get getNameValueForm(): AbstractControl {
    return this.boardForm.get('name');
  }

  private getBoard(): void {
    this.boardsService.getBoardById(this.boardId).subscribe({
      next: (resp: IBoards) => {
        this.board = resp;
        this.boardForm.patchValue(this.board);
        this.title = `Edit board ${this.board.name}`;
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

  public onAddBoard(): void {
    if (this.boardForm.invalid) {
      this.boardForm.markAllAsTouched();
    } else if (this.boardForm.valid) {
      this.boardsService.addBoard(this.boardForm.value).subscribe({
        next: (resp) => {
          this.createDefaultTags(resp.id);
          this.notificationService.sendMessage({
            message: `Board with name "${resp.name}" created`,
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

  private createDefaultTags(boardId): void {
    this.tagsService.createDefaultTags(boardId).subscribe({
      next: () => {
        this.actionManageBoard$.next(1);
        this.modalService.hide(1);
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


  public onUpdateBoard(form): void {
    if (this.boardForm.invalid) {
      this.boardForm.markAllAsTouched();
    } else if (this.boardForm.valid) {
      this.boardsService.updateBoard(this.boardId, form).subscribe({
        next: (resp) => {
          this.actionManageBoard$.next(1);
          this.modalService.hide(1);
          this.notificationService.sendMessage({
            message: `Board with name "${resp.name}" updated`,
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

  public onDeleteBoard(name): void {
    this.boardsService.deleteBoard(this.boardId).subscribe({
      next: () => {
        this.modalService.hide(1);
        this.actionManageBoard$.next(1);
        this.notificationService.sendMessage({
          message: `Board with name "${name}" deleted`,
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

  public onCloseBoard(): void {
    this.modalService.hide(1);
  }

}
