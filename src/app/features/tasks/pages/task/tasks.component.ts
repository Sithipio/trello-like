import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MDBModalService} from "angular-bootstrap-md";
import {BoardsService} from "@core/services/boards.service";
import {Subject} from "rxjs";
import {ITask} from "@shared/interfaces/task.interface";

@Component({
  selector: 'app-task',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TasksComponent implements OnInit {

  public idTask: string;
  public idBoard: string;
  public idColumn: string;
  public editTaskForm: FormGroup;
  public editTagForm: FormGroup;
  public actionEdit = new Subject<any>();
  public bgTask = this.boardsService.bgColorTask;
  public bgTag = this.boardsService.bgColorTag;
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
  ) {
  }

  ngOnInit() {
    this.editTaskForm = this.fb.group({
      taskId: [],
      taskName: ["", Validators.required],
      taskDesc: [""],
      taskTag: this.fb.array([]),
      taskDate: "sadasd",
      taskBackground: "",
      taskUser: [],

    });
    this.editTagForm = this.fb.group({
      tagId: '',
      tagName: '',
      tagBackground: "",
    })
    this.getBoardById();
    this.getTagTask();
  }

  getBoardById(): void {
//    this.task = this.boardsService.getTaskById(this.idBoard, this.idColumn, this.idTask);
    // this.actionEdit.next(id);
    this.editTaskForm.patchValue(this.task);
    console.log(this.task)
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
    console.log(this.editTaskForm.value)
    if (this.editTaskForm.invalid) {

    } else if (this.editTaskForm.valid) {
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
    this.tempTaskDesc = this.editTaskForm.value.taskDesc;
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
    this.editTaskForm.patchValue({taskDesc: this.tempTaskDesc})
    this.editTaskForm.updateValueAndValidity();
    this.toggleEditTaskDesc = null;
  }

  fff() {
    console.log(this.editTaskForm.value)
  }

  toggleTags(event, index) {
    if (event.target.checked) {
      this.editTaskForm.value.taskTag.push(this.tags[index]);
      console.log(  this.editTaskForm.value)
      this.getTag();
    } else {
      this.editTaskForm.value.taskTag = this.editTaskForm.value.taskTag.filter(item => item.tagId != index)
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
   console.log("tagId",tagId, "newTag", tagLength, "this.toggleEditTag", this.toggleEditTag)
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

  checkTagActive(itemId, idTask){
//    return this.boardsService.checkTagActive(itemId, idTask, this.idBoard, this.idColumn);
  }

}
