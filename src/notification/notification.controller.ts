import { Body, Controller, Post } from '@nestjs/common';
import { SendMessageDTO } from 'src/dto/message/send-message.dto';
import { MessageService } from 'src/services/message/message.service';

@Controller('notification')
export class NotificationController {
  constructor(private messageService: MessageService) {}

  @Post('send-bill')
  sendMessage(@Body() body: SendMessageDTO) {
    const { userContacts, message } = body;
    // TODO get user account details
    return this.messageService.sendMessage(userContacts, message);
  }
}
