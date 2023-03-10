import { MakeNotification } from '@test/factories/NotificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/InMemoryNotificationRepository';
import { CountRecipientNotifications } from './CountRecipientNotifications';

describe('Count Notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      MakeNotification({ recipientId: 'example-recipient' }),
    );

    await notificationsRepository.create(
      MakeNotification({ recipientId: 'example-recipient' }),
    );

    await notificationsRepository.create(
      MakeNotification({
        recipientId: 'example-recipient-test',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'example-recipient',
    });

    expect(count).toEqual(2);
  });
});
