import {
  Component,
  ElementRef, OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalService } from 'angular-bootstrap-md';
import { Subject, take } from 'rxjs';

import { BoardsService } from '@core/services/boards.service';
import { ITask } from '@shared/interfaces/task.interface';
import { TASK_BG_COLOR, TAG_BG_COLOR } from '@shared/constant';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationType } from '@shared/enums';
import { TasksService } from '../../services/tasks.service';
import { NotificationService } from '@shared/services';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})

export class TasksComponent implements OnInit, OnDestroy {

  private boardId: string;
  public taskId: string;
  public idColumn: string;
  public taskForm: FormGroup;
  public editTagForm: FormGroup;
  public actionEdit = new Subject<any>();
  public bgTask = TASK_BG_COLOR;
  public bgTag = TAG_BG_COLOR;
  public tags = this.boardsService.Tags;
  public task: ITask;
  public toggleEditTaskName: string = null;
  public toggleEditTaskDesc: string = null;
  public tempTaskDesc: string = null;
  public toggleEditTag: string = null;
  @ViewChild('textAreaDesc') textAreaDesc: ElementRef;

  constructor(public fb: FormBuilder,
              private modalService: MDBModalService,
              private boardsService: BoardsService,
              private tasksService: TasksService,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private router: Router
  ) {
  }

  ngOnInit() {
    console.log(this.route)
    this.createTaskForm();
    this.getTaskById();
    this.editTagForm = this.fb.group({
      id: '',
      name: '',
      background: '',
    })
  }

  private createTaskForm(): void {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      tag: this.fb.array([]),
      date: '',
      background: '',
      user: [],
    });
  }

  private getTaskById(): void {
    this.tasksService.getTask(this.boardId, this.taskId).pipe(take(1)).subscribe({
      next: (resp: ITask) => {
        this.task = resp;
        console.log(this.task);
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

  getBoardById(): void {
//    this.tasks = this.boardsService.getTaskById(this.idBoard, this.idColumn, this.idTask);
    // this.actionEdit.next(id);
   // this.editTaskForm.patchValue(this.tasks);
  }

  getTag() {
    return this.tags = this.boardsService.Tags;
  }

  getTagTask() {
    //this.editTaskForm.value.taskTag.patchValue(this.fb.group(this.boardsService.getTagTask(this.idTask, this.idBoard, this.idColumn)));
    // this.editTaskForm.value.taskTag.push(this.fb.group(this.boardsService.getTagTask(this.idTask, this.idBoard, this.idColumn)));
    //  console.log(this.boardsService.getTagTask(this.idTask, this.idBoard, this.idColumn))
  }

  closeBoard() {
    this.modalService.hide(1);
  }

  editTask(form) {
    console.log(this.taskForm.value)
    if (this.taskForm.invalid) {

    } else if (this.taskForm.valid) {
      /* this.boards = this.boardsService.getBoards();*/
      this.actionEdit.next(form);
      this.modalService.hide(1);
    }
  }

  toggleFormView() {
    this.toggleEditTaskName = null;
    this.toggleEditTaskDesc = null;
  }

  toggleBtnTaskName(id: string) {
    this.toggleEditTaskName = id;
    this.toggleEditTaskDesc = null;
  }

  toggleBtnTaskDesc(id: string) {
    this.toggleEditTaskDesc = id;
    this.tempTaskDesc = this.taskForm.value.taskDesc;
    this.toggleEditTaskName = null;
  }

  heightTextAreaDescription(textArea) {
    if (textArea.scrollHeight < 250) {
      return textArea.scrollHeight - 14 + 'px';
    } else if (textArea.scrollHeight > 250) {
      return this.textAreaDesc.nativeElement.style.height = 250 + 'px';
    }
  }

  cancelChangeTextArea() {
    this.taskForm.patchValue({taskDesc: this.tempTaskDesc})
    this.taskForm.updateValueAndValidity();
    this.toggleEditTaskDesc = null;
  }

  fff() {
    console.log(this.taskForm.value)
  }

  toggleTags(event, index) {
    if (event.target.checked) {
      this.taskForm.value.taskTag.push(this.tags[index]);
      console.log(this.taskForm.value)
      this.getTag();
    } else {
      this.taskForm.value.taskTag = this.taskForm.value.taskTag.filter(item => item.tagId != index)
    }
  }

  toggleBtnEditTag(tagId?, tagLength?) {

    if (this.toggleEditTag) {
      this.toggleEditTag = null;
    } else {
      this.toggleEditTag = tagId;
      //  this.editTagForm.patchValue(this.boardsService.getTag(tagId))
    }
    if (tagLength) {
      this.toggleEditTag = tagLength;
      this.toggleEditTag = tagLength.toString();
      this.editTagForm.reset();
    }
    console.log('tagId', tagId, 'newTag', tagLength, 'this.toggleEditTag', this.toggleEditTag)
  }


  addTag(form) {
    // this.boardsService.addTag(form);
    this.getTag();
  }

  editTag(form) {
    //   this.boardsService.editTag(form);
    this.getTag();
  }

  deleteTag(id) {
    //  this.boardsService.deleteTag(id);
    this.getTag();
  }

  checkTagActive(itemId, idTask) {
    return true;
//    return this.boardsService.checkTagActive(itemId, idTask, this.idBoard, this.idColumn);
  }

  ngOnDestroy(): void {
    this.router.navigate([{ outlets: { task: null }}]);
  }

}
