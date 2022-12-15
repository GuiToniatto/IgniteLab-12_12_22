import { SendNotification } from './SendNotifications';

import { InMemoryNotificationsRepository } from '@test/repositories/InMemoryNotificationRepository';

describe('Send Notification', () => {
  it('should be able to send notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: 'recipient-id',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
