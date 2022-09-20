import { Component, OnInit } from '@angular/core';
import { TASK_BG_COLOR } from '@shared/constant';
import { take } from 'rxjs';
import { NotificationType } from '@shared/enums';
import { DataUpdateService, TasksService } from '../../services';
import { NotificationService } from '@shared/services';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MDBModalService } from 'angular-bootstrap-md';

@Component({
  selector: 'app-task-cover',
  templateUrl: './task-cover.component.html',
  styleUrls: ['./task-cover.component.scss'],
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
    this.editBackgroundForm.patchValue({background: this.background});
  }

  public createEditBackgroundForm(): void {
    this.editBackgroundForm = this.fb.group({
      background: '',
    });
  }

  public updateTaskBackground(background: string): void {
    this.tasksService.updateTaskBackground(this.boardId, this.taskId, background).pipe(take(1)).subscribe({
      next: () => {
        this.dataUpdateService.sendUpdateTaskId(this.taskId);
        this.dataUpdateService.sendUpdateTaskData(background);
        this.editBackgroundForm.patchValue({background: background});
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

  public closeModal(): void {
     this.modalService._hideModal(2);
  }

}
