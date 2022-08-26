import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IBoards} from '@shared/interfaces/boards.interface';
import {MDBModalService} from 'angular-bootstrap-md';
import {Subject, take} from 'rxjs';
import {BoardsService} from '../../services/boards.service';
import {BOARD_BG_COLOR} from '@shared/constant/board-background.constant';
import {BoardBackground} from '@shared/enums/board-background';

@Component({
  selector: 'app-board-add',
  templateUrl: './board-add.component.html',
  styleUrls: ['../../../../styles/boards.scss'],
})

export class BoardAddComponent implements OnInit {

  public boards: IBoards[] = [];
  public addBoardForm: FormGroup;
  public actionAdd$ = new Subject<any>();
  public bgBoard = BOARD_BG_COLOR;

  constructor(public fb: FormBuilder,
              private modalService: MDBModalService,
              private boardsService: BoardsService) {
  }

  public ngOnInit(): void {
    this.boardAddForm();
  }

  public boardAddForm(): void {
    this.addBoardForm = this.fb.group({
      background: [BoardBackground.GREY, Validators.required],
      name: [null, [Validators.required, Validators.maxLength(15)]],
      isFavorite: [false],
    });
  }

  get boardNameForm(): AbstractControl {
    return this.addBoardForm.get('name');
  }

  public addBoard(): void {
    if (this.addBoardForm.invalid) {
      this.addBoardForm.markAllAsTouched();
    } else if (this.addBoardForm.valid) {
      this.boardsService.addBoard(this.addBoardForm.value).pipe(take(1)).subscribe({
        next: () => {
          this.actionAdd$.next(1);
          this.modalService.hide(1);
        },
        error: () => {
          //todo pop error
        },
      })
    }
  }

  public closeBoard(): void {
    this.modalService.hide(1);
  }

}

