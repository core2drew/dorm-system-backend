import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { TWILIO } from '../../enums/twilio.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MessageService {
  constructor(private configService: ConfigService) {}
  async sendMessage(phoneNumbers: string[], messageBody: string) {
    const accountSid = this.configService.get<string>('SMS_SERVICE_ACC_SID');
    const authToken = this.configService.get<string>('SMS_SERVICE_AUTH_TOKEN');
    const messagingServiceSid = this.configService.get<string>(
      'SMS_MESSAGING_SERVICE_ID',
    );

    const client = new Twilio(accountSid, authToken);
    for (const number in phoneNumbers) {
      try {
        const response = await client.messages.create({
          body: messageBody,
          from: TWILIO.SENDER_NO,
          messagingServiceSid,
          to: number,
        });
        console.log(`Message sent to ${number}: ${response.sid}`);
      } catch (error) {
        console.error(`Failed to send message to ${number}:`, error);
      }
    }
  }
}
