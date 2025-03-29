import { Body, Controller, Post } from '@nestjs/common';
import { SendMessageDTO } from 'src/dto/message/send-message.dto';
import { MessageService } from 'src/services/message/message.service';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post('send-message')
  sendMessage(@Body() body: SendMessageDTO) {
    const { phoneNumbers, message } = body;
    return this.messageService.sendMessage(phoneNumbers, message);
  }
}
