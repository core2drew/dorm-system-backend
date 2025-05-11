import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MessageController } from './controllers/message/message.controller';
import { MessageService } from './services/message/message.service';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';
import { NotificationController } from './controllers/notification/notification.controller';
import { BillService } from './services/bill/bill.service';

@Module({
  imports: [ConfigModule.forRoot({ cache: true }), FirebaseModule],
  controllers: [
    AppController,
    MessageController,
    UserController,
    NotificationController,
  ],
  providers: [MessageService, UserService, BillService],
})
export class AppModule {}
