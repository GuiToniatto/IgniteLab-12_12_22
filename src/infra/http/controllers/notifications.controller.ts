import { CancelNotification } from '@app/use-cases/Notification/CancelNotification';
import { CountRecipientNotifications } from '@app/use-cases/Notification/CountRecipientNotifications';
import { GetRecipientNotifications } from '@app/use-cases/Notification/GetRecipientNotifications';
import { ReadNotification } from '@app/use-cases/Notification/ReadNotification';
import { UnreadNotification } from '@app/use-cases/Notification/UnreadNotification';
import { Body, Controller, Post } from '@nestjs/common';
import { Get, Param, Patch } from '@nestjs/common/decorators';
import { SendNotification } from 'src/app/use-cases/Notification/SendNotifications';
import { CreateNotificationBody } from '../dtos/CreateNotificationBody';
import { NotificationViewModel } from '../view-models/NotificationViewModel';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private cancelNotification: CancelNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
    private readNotification: ReadNotification,
    private sendNotification: SendNotification,
    private unreadNotification: UnreadNotification,
  ) {}

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

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }
}
