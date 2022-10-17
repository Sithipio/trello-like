import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MDBModalService } from 'angular-bootstrap-md';

import { TASK_BG_COLOR } from '@shared/constant';
import { DataUpdateService, TasksService } from '../../services';
import { NotificationService } from '@shared/services';

@Component({
  selector: 'app-task-cover',
  templateUrl: './task-cover.component.html',
  styleUrls: [
    '../../styles/modal.scss',
    '../../styles/radio.scss',
  ],
})
export class TaskCoverComponent implements OnInit {
  public boardId: string;
  public taskId: string;
  public background: string;
  public bgTask = TASK_BG_COLOR;
  public editBackgroundForm: FormGroup;

  constructor(private fb: FormBuilder,
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
        this.dataUpdateService.sendUpdateBackground(background);
        this.editBackgroundForm.patchValue({ background: background });
      },
      error: ({ error }) => {
        this.notificationService.sendMessages(error);
      },
    });
  }

  public onCloseModal(): void {
    this.modalService._hideModal(2);
  }

}
