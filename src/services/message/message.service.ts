import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserContactDTO } from 'src/dto/message/send-message.dto';
import { handleServiceError } from 'src/shared/utils/error-handler.util';
import { Vonage } from '@vonage/server-sdk';
import { AuthInterface } from '@vonage/auth';
import { randomUUID } from 'crypto';
@Injectable()
export class MessageService {
  readonly serviceName = 'message-service';
  constructor(private configService: ConfigService) {}

  async sendMessage(contact: UserContactDTO, messageBody: string) {
    const apiKey = this.configService.get<string>('VONAGE_API_KEY');
    const apiSecret = this.configService.get<string>('VONAGE_API_SECRET');
    console.log(apiKey);
    console.log(this.configService.get<string>('twilio_account_sid'));
    const vonage = new Vonage({
      apiKey,
      apiSecret,
    } as AuthInterface);

    try {
      const from = 'Dorm flow';
      const { mobileNo } = contact;
      await vonage.sms
        .send({ to: mobileNo, from, text: messageBody })
        .then((resp) => {
          console.log('Message sent successfully');
          console.log(resp);
        })
        .catch((err) => {
          console.log('There was an error sending the messages.');
          console.error(err);
        });
      return randomUUID();
    } catch (error) {
      handleServiceError(error, `${this.serviceName}-sendMessage`);
    }
  }
}
