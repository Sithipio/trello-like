import { Component, OnInit } from '@angular/core';
import { TAG_BG_COLOR } from '@shared/constant';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ITag } from '@shared/interfaces';
import { DataUpdateService, TagsService, TasksService } from '../../services';
import { NotificationService } from '@shared/services';
import { MDBModalService } from 'angular-bootstrap-md';
import { take } from 'rxjs';
import { NotificationType } from '@shared/enums';

@Component({
  selector: 'app-task-tag',
  templateUrl: './task-tag.component.html',
  styleUrls: [
    '../../../../styles/modal.scss',
    './task-tag.component.scss',
  ],
})
export class TaskTagComponent implements OnInit {
  public boardId: string;
  public taskId: string;
  public tags: ITag[];
  public tagsByBoard: ITag[];
  public background: string;
  public bgTag = TAG_BG_COLOR;
  public editTagsForm: FormGroup;
  public toggleEditTaskTag: string = null;

  constructor(public fb: FormBuilder,
              private tasksService: TasksService,
              private dataUpdateService: DataUpdateService,
              private notificationService: NotificationService,
              private modalService: MDBModalService,
              private tagService: TagsService,
  ) {
  }

  ngOnInit(): void {
    this.createEditTagsForm();
    this.chake();
    // console.log(this.tags);
    // console.log(this.tagsByBoard)
  }

  public createEditTagsForm(): void {
    this.editTagsForm = this.fb.group({
      name: '',
      background: '',
    });
  }

  public createTagByBoardId(dataTag: ITag): void {
    this.tagService.createTagByBoardId(this.boardId, dataTag).pipe(take(1)).subscribe({
      next: () => {
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


  public chake() {
    console.log('tt', this.tags)
    let a = this.tags.map(item => item.id)
    let b = this.tagsByBoard.filter((item) => item.id )
    console.log('a', a)
    console.log('b', b)

  }

  checkTagActive(itemId) {


    /*this.tagsByBoard.find(tag => tag.id === )*/
    return true;
  }


  toggleTags(event, index) {
    /*    if (event.target.checked) {
          this.taskForm.value.taskTag.push(this.tagsByBoard[index]);
          //   this.getTag();
        } else {
          this.taskForm.value.taskTag = this.taskForm.value.taskTag.filter(item => item.tagId != index);
        }*/
  }

  toggleBtnEditTag(tagId?, tagLength?) {

    /*    if (this.toggleEditTag) {
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
      */
  }

  deleteTag() {

  }

  editTag(value) {

  }

  public closeModal(): void {
    this.modalService._hideModal(2);
  }

}
