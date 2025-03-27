import { Body, Controller, Post } from '@nestjs/common';
import { SendMessageDto } from 'src/dto/message/send-message.dto';
import { MessageService } from 'src/services/message/message.service';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post('send-message')
  sendMessage(@Body() body: SendMessageDto) {
    const { phoneNumber, message } = body;
    return this.messageService.sendMessage(phoneNumber, message);
  }
}
