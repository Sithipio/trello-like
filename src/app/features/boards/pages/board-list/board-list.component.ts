import {Component, OnInit} from '@angular/core';
import {IBoards} from '@shared/interfaces/boards.interface';
import {BoardAddComponent} from '../board-add/board-add.component';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {take} from 'rxjs';
import {BoardEditComponent} from '../board-edit/board-edit.component';
import {BoardsService} from '../../services/boards.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})

export class BoardListComponent implements OnInit {

  public boards: IBoards[] = [];
  public modalRef: MDBModalRef | null = null;

  constructor(private modalService: MDBModalService,
              private boardsService: BoardsService) {
  }

  public ngOnInit(): void {
    this.getBoards();
  }

  private getBoards(): void {
    this.boardsService.getBoards().pipe(take(1)).subscribe({
      next: (resp: IBoards[]) => {
        this.boards = resp;
      },
      error: () => {
        //todo pop error
      },
    });
  }

  public openAddBoard(): void {
    this.modalRef = this.modalService.show(BoardAddComponent, {
      backdrop: false,
      keyboard: false,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-side modal-sm modal-top-right mt-3 pt-3',
      containerClass: 'right',
      animated: true,
    });
    this.modalRef.content.actionAdd$.pipe(take(1)).subscribe(() => {
      this.getBoards();
    });
  }

  public openEditBoard(idBoard: string): void {
    this.modalRef = this.modalService.show(BoardEditComponent, {
      backdrop: false,
      keyboard: false,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-side modal-sm modal-top-right mt-3 pt-3',
      containerClass: 'right',
      animated: true,
      data: {
        idBoard,
      },
    });
    this.modalRef.content.actionEdit$.pipe(take(1)).subscribe(() => {
      this.getBoards();
    });
  }

  public toggleFavorite(board: IBoards): void {
    this.boardsService.toggleFavorite(board.id, board.isFavorite).pipe(take(1)).subscribe({
      next: () => {
        this.getBoards();
      },
      error: () => {
        //todo pop error
      },
    })
  }

}
