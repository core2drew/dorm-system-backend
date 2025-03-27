import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MessageController } from './message/message.controller';
import { MessageService } from './services/message/message.service';
import { UserController } from './user/user.controller';
import { UserService } from './services/user/user.service';
import { FirebaseModule } from './modules/firebase/firebase.module';

@Module({
  imports: [ConfigModule.forRoot({ cache: true }), FirebaseModule],
  controllers: [AppController, MessageController, UserController],
  providers: [AppService, MessageService, UserService],
})
export class AppModule {}
