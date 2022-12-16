import { CancelNotification } from '@app/use-cases/Notification/CancelNotification';
import { CountRecipientNotifications } from '@app/use-cases/Notification/CountRecipientNotifications';
import { GetRecipientNotifications } from '@app/use-cases/Notification/GetRecipientNotifications';
import { ReadNotification } from '@app/use-cases/Notification/ReadNotification';
import { UnreadNotification } from '@app/use-cases/Notification/UnreadNotification';
import { Module } from '@nestjs/common';
import { SendNotification } from 'src/app/use-cases/Notification/SendNotifications';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    SendNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
