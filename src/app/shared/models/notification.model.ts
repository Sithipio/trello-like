import { NotificationType } from '@shared/enums/notification';

export interface NotificationMessage {
  title?: string;
  message: string;
  type?: NotificationType;
}
