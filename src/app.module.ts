import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MessageController } from './message/message.controller';
import { MessageService } from './services/message/message.service';
import { UserController } from './user/user.controller';
import { UserService } from './services/user/user.service';
import { FirebaseModule } from './modules/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [AppController, MessageController, UserController],
  providers: [MessageService, UserService],
})
export class AppModule {}
