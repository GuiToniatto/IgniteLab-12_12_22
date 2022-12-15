import { Module } from '@nestjs/common';
import { SendNotification } from 'src/app/use-cases/Notification/SendNotifications';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HttpModule {}
