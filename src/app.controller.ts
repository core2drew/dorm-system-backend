import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SendMessageDto } from './dto/send-message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  sayHello() {
    return {
      message: 'Hello world from Dorm system 🥳',
    };
  }

  @Post('send-message')
  sendMessage(@Body() body: SendMessageDto) {
    const { phoneNumber, message } = body;
    return this.appService.sendMessage(phoneNumber, message);
  }
}
