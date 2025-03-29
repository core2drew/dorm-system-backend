import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { TWILIO } from '../../enums/twilio.enum';

@Injectable()
export class MessageService {
  async sendMessage(phoneNumbers: string[], messageBody: string) {
    const accountSid = process.env.SMS_SERVICE_ACC_SID;
    const authToken = process.env.SMS_SERVICE_AUTH_TOKEN;
    const messagingServiceSid = process.env.SMS_MESSAGING_SERVICE_ID;

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
