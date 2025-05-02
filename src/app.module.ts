import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MessageController } from './message/message.controller';
import { MessageService } from './services/message/message.service';
import { UserController } from './user/user.controller';
import { UserService } from './services/user/user.service';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';
import { PublisherController } from './publisher/publisher.controller';

@Module({
  imports: [ConfigModule.forRoot({ cache: true }), FirebaseModule],
  controllers: [
    AppController,
    MessageController,
    UserController,
    PublisherController,
  ],
  providers: [MessageService, UserService],
})
export class AppModule {}
