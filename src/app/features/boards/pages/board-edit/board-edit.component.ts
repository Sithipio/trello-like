import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IBoards} from '@shared/interfaces/boards.interface';
import {MDBModalService} from 'angular-bootstrap-md';
import {Subject, take} from 'rxjs';
import {BoardsService} from '../../services/boards.service';
import {BOARD_BG_COLOR} from '@shared/constant/board-background.constant';

@Component({
  selector: 'app-board-edit',
  templateUrl: './board-edit.component.html',
  styleUrls: ['../../../../styles/boards.scss'],
})

export class BoardEditComponent implements OnInit {

  public idBoard: string;
  public editBoardForm: FormGroup;
  public actionEdit$ = new Subject<any>();
  public bgBoard = BOARD_BG_COLOR;
  public board: IBoards;

  constructor(public fb: FormBuilder,
              private modalService: MDBModalService,
              private boardsService: BoardsService) {
  }

  public ngOnInit(): void {
    this.getBoard();
    this.boardEditForm();
  }

  private getBoard(): void {
    this.boardsService.getBoardById(this.idBoard).pipe(take(1)).subscribe({
      next: (resp: IBoards) => {
        this.board = resp;
        this.editBoardForm.patchValue(this.board);
      },
      error: () => {
        //todo pop window error
      },
    });
  }

  public boardEditForm(): void {
    this.editBoardForm = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(15)]],
      background: [Validators.required],
    });
  }

  get getNameValueForm(): AbstractControl {
    return this.editBoardForm.get('name');
  }

  public editBoard(form): void {
    if (this.editBoardForm.invalid) {
      this.editBoardForm.markAllAsTouched();
    } else if (this.editBoardForm.valid) {
      this.boardsService.editBoard(this.idBoard, form).pipe(take(1)).subscribe({
        next: () => {
          this.actionEdit$.next(1);
          this.modalService.hide(1);
        },
        error: () => {
          //todo pop window error
        },
      });
    }
  }

  public deleteBoard(): void {
    this.boardsService.deleteBoard(this.idBoard).pipe((take(1))).subscribe({
      next: () => {
        this.modalService.hide(1);
        this.actionEdit$.next(1);
      }, error: () => {
        //todo pop window error
      },
    });
  }

  public closeBoard(): void {
    this.modalService.hide(1);
  }

}
