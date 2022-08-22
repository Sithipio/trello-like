import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BoardsService} from "@core/services/boards.service";
import {IBoards} from "@shared/interfaces/boards.interface";
import {MDBModalService} from "angular-bootstrap-md";
import {Subject} from "rxjs";

@Component({
  selector: 'app-board-add',
  templateUrl: './board-add.component.html',
  styleUrls: ['../../../../styles/boards.scss']
})

export class BoardAddComponent implements OnInit {

  public boards: IBoards[] = [];
  public addBoardForm: FormGroup;
  public actionAdd = new Subject<any>();
  public bgBoard = this.boardsService.bgColorBoard;


  constructor(public fb: FormBuilder,
              private modalService: MDBModalService,
              private boardsService: BoardsService) {
  }

  ngOnInit() {
    this.addBoardForm = this.fb.group({
      boardId: [''],
      boardBackground: ['#838C91', Validators.required],
      boardName: [null, [Validators.required, Validators.maxLength(15)]],
      boardFavorite: [false],
      boardColumn: [[]],
    });
  }

  get boardNameForm() {
    return this.addBoardForm.get('boardName');
  }

  addBoard(form) {
    if (this.addBoardForm.invalid) {
      this.addBoardForm.markAllAsTouched();
    } else if (this.addBoardForm.valid) {
      //this.boards = this.boardsService.getBoards();
      this.actionAdd.next(form);
      this.modalService.hide(1);
    }
  }

  closeBoard() {
    this.modalService.hide(1);
  }
}

