import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MDBModalService } from 'angular-bootstrap-md';

import { TASK_BG_COLOR } from '@shared/constant';
import { NotificationType } from '@shared/enums';
import { DataUpdateService, TasksService } from '../../services';
import { NotificationService } from '@shared/services';

@Component({
  selector: 'app-task-cover',
  templateUrl: './task-cover.component.html',
  styleUrls: [
    '../../styles/modal.scss',
    './task-cover.component.scss',
  ],
})
export class TaskCoverComponent implements OnInit {
  public boardId: string;
  public taskId: string;
  public background: string;
  public bgTask = TASK_BG_COLOR;
  public editBackgroundForm: FormGroup;

  constructor(public fb: FormBuilder,
              private tasksService: TasksService,
              private dataUpdateService: DataUpdateService,
              private notificationService: NotificationService,
              private modalService: MDBModalService,
  ) {
  }

  ngOnInit(): void {
    this.createEditBackgroundForm();
    this.editBackgroundForm.patchValue({ background: this.background });
  }

  public createEditBackgroundForm(): void {
    this.editBackgroundForm = this.fb.group({
      'background': '',
    });
  }

  public onUpdateTaskBackground(background: string): void {
    this.tasksService.updateTaskBackground(this.boardId, this.taskId, background).subscribe({
      next: () => {
        this.dataUpdateService.sendUpdateTaskId(this.taskId);
        this.dataUpdateService.sendUpdateTaskData(background);
        this.editBackgroundForm.patchValue({ background: background });
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

  public onCloseModal(): void {
    this.modalService._hideModal(2);
  }

}
