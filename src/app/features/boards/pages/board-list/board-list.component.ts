import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';

import { take } from 'rxjs';
import { IBoards } from '@shared/models/boards.model';
import { BoardsService } from '../../services/boards.service';
import { BoardManageComponent } from '../board-manage/board-manage.component';
import { NotificationType } from '@shared/enums';
import { NotificationService } from '@shared/services';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: [
    '../../../../styles/_font-styles.scss',
    './board-list.component.scss',
  ],
})
export class BoardListComponent implements OnInit {

  public boards: IBoards[] = [];
  public modalRef: MDBModalRef | null = null;

  constructor(private modalService: MDBModalService,
              private boardsService: BoardsService,
              private notificationService: NotificationService,
  ) {
  }

  public ngOnInit(): void {
    this.getBoards();
  }

  private getBoards(): void {
    this.boardsService.getBoards().subscribe({
      next: (resp: IBoards[]) => {
        this.boards = resp;
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

  public onOpenManageBoard(boardId?: string): void {
    this.modalRef = this.modalService.show(BoardManageComponent, {
      backdrop: false,
      keyboard: false,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-side modal-sm modal-top-right mt-3 pt-3',
      containerClass: 'right',
      animated: true,
      data: {
        boardId,
      },
    });
    this.modalRef.content.actionManageBoard$.pipe(take(1)).subscribe(() => {
      this.getBoards();
    });
  }

  public onToggleFavorite(board: IBoards): void {
    this.boardsService.toggleFavorite(board.id, board.isFavorite).subscribe({
      next: () => {
        this.getBoards();
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
