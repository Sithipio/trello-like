import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalService } from 'angular-bootstrap-md';

import { TAG_BG_COLOR } from '@shared/constant';
import { ITag } from '@shared/models';
import { DataUpdateService, TagsService } from '../../services';
import { NotificationService } from '@shared/services';
import { NotificationType } from '@shared/enums';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-tag',
  templateUrl: './task-tag.component.html',
  styleUrls: ['./task-tag.component.scss'],
})
export class TaskTagComponent implements OnInit, OnDestroy {
  public boardId: string;
  public taskId: string;
  public tag: ITag;
  public tags: ITag[];
  public tagsByBoard: ITag[];
  public background: string;
  public bgTag = TAG_BG_COLOR;
  public editTagsForm: FormGroup;
  public operationTag: string = '';
  public modifiedTags = [];
  private _tagSub = new Subscription;

  constructor(private fb: FormBuilder,
              private dataUpdateService: DataUpdateService,
              private notificationService: NotificationService,
              private modalService: MDBModalService,
              private tagService: TagsService,
  ) {
  }

  ngOnInit(): void {
    this.getTags();
    this.createEditTagsForm();
    if (this.tag) {
      this.editTagsForm.patchValue({ ...this.tag });
    }
  }

  get nameControl(): AbstractControl {
    return this.editTagsForm.get('name');
  }

  private createEditTagsForm(): void {
    this.editTagsForm = this.fb.group({
      'id': '',
      'name': ['', Validators.maxLength(20)],
      'background': '',
    });
  }

  public trackByFn(index, item) {
    return item.id;
  }

  private getTags(): void {
    this.tagService.getTags(this.boardId).subscribe({
      next: (resp: ITag[]) => {
        this.tagsByBoard = resp;
        this.checkTags();
      },
      error: ({ error }) => {
        this.notificationService.sendMessages(error);
      },
    });
  }

  public onOperationWithTag(operation: string, tagId?: string): void {
    this.editTagsForm.reset({ id: '', name: '', background: '' });
    switch (operation) {
      case 'create': {
        this.operationTag = 'create';
        break;
      }
      case 'createFromTask': {
        this.operationTag = 'createFromTask';
        break;
      }
      case 'edit': {
        this.operationTag = 'edit';
        if (tagId) {
          this.getTag(tagId);
        }
        break;
      }
      case 'editFromTask': {
        this.operationTag = 'editFromTask';
        if (tagId) {
          this.getTag(tagId);
        }
        break;
      }
      default:
        this.operationTag = '';
        break;
    }
  }

  private getTag(tagId: string): void {
    this.tagService.getTag(this.boardId, tagId).subscribe({
      next: (resp) => {
        this.editTagsForm.patchValue({ ...resp });
      },
      error: ({ error }) => {
        this.notificationService.sendMessages(error);
      },
    });
  }

  public onCreateTag(tag: ITag): void {
    let data = { name: tag.name, background: tag.background };
    this.tagService.createTag(this.boardId, data).subscribe({
      next: (resp) => {

        if(this.editTagsForm.valid) {

          if (this.operationTag === 'createFromTask') {
            const dataTag = { ...tag, id: resp.id };
            this.toggleOnTagToTask(dataTag);
            this.onCloseModal();
          }

          this.updateTag();

          this.notificationService.sendMessages({
            message: `Tag with name "${tag.name}" created`,
            type: NotificationType.SUCCESS,
          });

        }
      },
      error: ({ error }) => {
        this.notificationService.sendMessages(error);
      },
    });
  }

  public onUpdateTag(tag: ITag) {
    this.tagService.updateTag(this.boardId, tag).subscribe({
      next: () => {

        if(this.editTagsForm.valid) {

        if (this.operationTag === 'editFromTask') {
          this.onCloseModal();
        }

        this.updateTag();

        this.notificationService.sendMessages({
          message: `Tag with name "${tag.name}" updated`,
          type: NotificationType.SUCCESS,
        });

        }
      },
      error: ({ error }) => {
        this.notificationService.sendMessages(error);
      },
    });
  }

  public onDeleteTag(tag: ITag): void {
    this.tagService.deleteTagByBoardId(this.boardId, tag.id).subscribe({
      next: () => {

        if (this.operationTag === 'editFromTask') {
          this.onCloseModal();
        }

        this.updateTag();

        this.notificationService.sendMessages({
          message: `Tag with name "${tag.name}" deleted`,
          type: NotificationType.INFO,
        });

      },
      error: ({ error }) => {
        this.notificationService.sendMessages(error);
      },
    });
  }

  private checkTags(): void {
    let idsTag = this.tags.map(item => item.id);
    this.modifiedTags = this.tagsByBoard.map((item) => ({
      ...item,
      checked: idsTag.includes(item.id),
    }));
  }

  public onToggleTags(event, tag): void {
    if (event.target.checked) {
      this.toggleOnTagToTask(tag);
    } else {
      this.toggleOffTagToTask(tag);
    }
  }

  private toggleOnTagToTask(tag: ITag): void {
    this.tagService.toggleOnTagToTask(this.boardId, tag.id, this.taskId).subscribe({
      next: () => {
      this.dataUpdateService.sendUpdateTagsByBoard(this.modifiedTags);
      },
      error: ({ error }) => {
        this.notificationService.sendMessages(error);
      },
    });
  }

  private toggleOffTagToTask(tag: ITag): void {
    this.tagService.toggleOffTagToTask(this.boardId, tag.id, this.taskId).subscribe({
        next: () => {
          this.dataUpdateService.sendUpdateTagsByBoard(this.modifiedTags);
        },
        error: ({ error }) => {
          this.notificationService.sendMessages(error);
        },
      },
    );
  }

  private updateTag(): void {
    this.getTags();
    this.operationTag = '';
    this.dataUpdateService.sendUpdateTagsByBoard(this.modifiedTags);
    this.editTagsForm.reset({ id: '', name: '', background: '' });
  }

  public onCloseModal(): void {
    this.modalService._hideModal(2);
  }

  public ngOnDestroy() {
    this._tagSub.unsubscribe();
  }

}
