import { Content } from '@app/entities/Notification/Content';
import { Notification } from '@app/entities/Notification/Notification';
import { InMemoryNotificationsRepository } from '@test/repositories/InMemoryNotificationRepository';
import { CountRecipientNotifications } from './CountRecipientNotifications';

describe('Cancel Notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade!'),
        recipientId: 'example-recipient',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade!'),
        recipientId: 'example-recipient',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade!'),
        recipientId: 'example-recipient-test',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'example-recipient',
    });

    expect(count).toEqual(2);
  });
});
