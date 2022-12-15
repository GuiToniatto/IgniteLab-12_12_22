import { MakeNotification } from '@test/factories/NotificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/InMemoryNotificationRepository';
import { GetRecipientNotifications } from './GetRecipientNotifications';

describe('Recipient Notifications', () => {
  it("should be able to get all recipient's notifications", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'example-recipient',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-recipient' }),
        expect.objectContaining({ recipientId: 'example-recipient' }),
      ]),
    );
  });
});
