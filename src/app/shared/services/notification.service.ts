import {Injectable} from '@angular/core';
import {NotificationType} from '@shared/enums/notification';
import {ToastrService} from 'ngx-toastr';
import {NotificationMessage} from '@shared/interfaces/notification.interface.';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  private notificationSubject: Subject<NotificationMessage> = new Subject<NotificationMessage>();

  sendMessage(message: NotificationMessage) {
    this.notificationSubject.next(message);
  }

  constructor(private toastrService: ToastrService) {
    this.notificationSubject.subscribe({
      next: (message) => {
        switch (message.type) {
          case NotificationType.SUCCESS:
            this.toastrService.success(message.message, message.title);
            break;
          case NotificationType.ERROR:
            this.toastrService.error(message.message, message.title);
            break;
          case NotificationType.WARNING:
            this.toastrService.warning(message.message, message.title);
            break;
          default:
          case NotificationType.INFO:
            this.toastrService.info(message.message, message.title);
            break;
        }
      },
      error: () => {
        console.log('Error when processing toastr message');
      },
    });
  }
}
