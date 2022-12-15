import { MakeNotification } from '@test/factories/NotificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/InMemoryNotificationRepository';
import { NotificationNotFound } from '../errors/NotificationNotFound';
import { ReadNotification } from './ReadNotification';

describe('Read Notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = MakeNotification();

    await notificationsRepository.create(notification);

    await readNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'fakeNotificationId',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
