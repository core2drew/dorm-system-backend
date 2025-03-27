import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MessageController } from './message/message.controller';
import { MessageService } from './services/message/message.service';
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, MessageController],
  providers: [AppService, MessageService],
})
export class AppModule {}
