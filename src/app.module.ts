import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MessageController } from './message/message.controller';
import { MessageService } from './services/message/message.service';
import { UserController } from './user/user.controller';
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, MessageController, UserController],
  providers: [AppService, MessageService],
})
export class AppModule {}
