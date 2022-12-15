import { Content } from '@app/entities/Notification/Content';
import {
  Notification,
  NotificationProps,
} from '@app/entities/Notification/Notification';

type Override = Partial<NotificationProps>;

export function MakeNotification(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('Nova solicitação de amizade!'),
    recipientId: 'example-recipient',
    ...override,
  });
}
