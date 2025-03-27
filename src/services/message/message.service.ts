import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import {TWILIO } from '../../enums/twilio.enum';

@Injectable()
export class MessageService {
    sendMessage(to: string, message: string) {
        const accountSid = process.env.SMS_SERVICE_ACC_SID;
        const authToken = process.env.SMS_SERVICE_AUTH_TOKEN;
        const messagingServiceSid = process.env.SMS_MESSAGING_SERVICE_ID;
    
        const client = new Twilio(accountSid, authToken);
    
        client.messages
          .create({
            body: message,
            from: TWILIO.SENDER_NO,
            messagingServiceSid,
            to,
          })
          .then((message) => console.log(message.sid))
          .then((d) => console.log(d));
      }
    }
}
