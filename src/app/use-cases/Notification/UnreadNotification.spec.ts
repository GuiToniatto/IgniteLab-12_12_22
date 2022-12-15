import { MakeNotification } from '@test/factories/NotificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/InMemoryNotificationRepository';
import { NotificationNotFound } from '../errors/NotificationNotFound';
import { UnreadNotification } from './UnreadNotification';

describe('Unead Notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = MakeNotification({ readAt: new Date() });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fakeNotificationId',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
