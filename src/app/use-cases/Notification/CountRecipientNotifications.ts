import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../../repositories/NotificationsRepository';
import { NotificationNotFound } from '../errors/NotificationNotFound';

interface CountRecipientNotificationsRequest {
  recipientId: string;
}

interface CountRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CountRecipientNotificationsRequest,
  ): Promise<CountRecipientNotificationsResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.findManyByRecipientId(
      recipientId,
    );

    if (!count) {
      throw new NotificationNotFound();
    }

    return { count };
  }
}
