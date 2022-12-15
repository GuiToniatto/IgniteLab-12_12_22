import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from 'src/app/use-cases/Notification/SendNotifications';
import { CreateNotificationBody } from '../dtos/CreateNotificationBody';
import { NotificationViewModel } from '../view-models/NotificationViewModel';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, category, content } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });

    const raw = NotificationViewModel.toHTTP(notification);

    return {
      notification: raw,
    };
  }
}
