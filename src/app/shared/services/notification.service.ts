import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { NotificationMessage } from '@shared/models/notification.model';
import { NotificationType } from '@shared/enums/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject: Subject<NotificationMessage> = new Subject<NotificationMessage>();

  constructor(private toastrService: ToastrService) {
    this.notificationSubject.subscribe({
      next: (message) => {
        switch (message.type) {
          case NotificationType.SUCCESS:
            this.toastrService.success(message.message);
            break;
          case NotificationType.ERROR:
            this.toastrService.error(message.message, message.title, {
              closeButton: true,
              positionClass: 'toast-bottom-center',
            });
            break;
          case NotificationType.WARNING:
            this.toastrService.warning(message.message, message.title);
            break;
          default:
          case NotificationType.INFO:
            this.toastrService.info(message.message);
            break;
        }
      },
      error: () => {
        console.log('Error when processing toastr message');
      },
    });
  }

  public sendMessages(mes: NotificationMessage): void {
    if (!mes.type) {
      mes.type = NotificationType.ERROR;
    }
    const message: NotificationMessage = {
      title: mes.title,
      message: mes.message,
      type: mes.type,
    };
    this.notificationSubject.next(message);
  }

}
