import { Notification } from '../entities/Notification/Notification';

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract findManyByRecipientId(recipientId: string): Promise<number | null>;
  abstract save(notification: Notification): Promise<void>;
}
