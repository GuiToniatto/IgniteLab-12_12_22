import { Content } from '@app/entities/Notification/Content';
import { Notification } from '@app/entities/Notification/Notification';
import { InMemoryNotificationsRepository } from '@test/repositories/InMemoryNotificationRepository';
import { NotificationNotFound } from '../errors/NotificationNotFound';
import { CancelNotification } from './CancelNotification';

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification({
      category: 'social',
      content: new Content('Nova solicitação de amizade!'),
      recipientId: 'example-recipient',
    });

    await notificationsRepository.create(notification);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fakeNotificationId',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
