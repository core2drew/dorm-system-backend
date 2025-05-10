import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { TWILIO } from '../../enums/twilio.enum';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from 'src/modules/firebase/services/firebase-service/firebase-service';
import { Timestamp } from 'firebase-admin/firestore';
import { UserContactDTO } from 'src/dto/message/send-message.dto';
import { handleServiceError } from 'src/shared/utils/error-handler.util';
@Injectable()
export class MessageService {
  readonly serviceName = 'message-service';
  constructor(
    private configService: ConfigService,
    private firebase: FirebaseService,
  ) {}

  async sendMessage(userContact: UserContactDTO[], messageBody: string) {
    const accountSid = this.configService.get<string>('SMS_SERVICE_ACC_SID');
    const authToken = this.configService.get<string>('SMS_SERVICE_AUTH_TOKEN');
    const messagingServiceSid = this.configService.get<string>(
      'SMS_MESSAGING_SERVICE_ID',
    );
    const result = [];
    const sendToUids = [];
    const client = new Twilio(accountSid, authToken);
    let messagesRef: FirebaseFirestore.DocumentReference<
      FirebaseFirestore.DocumentData,
      FirebaseFirestore.DocumentData
    >;

    try {
      for (const contact of userContact) {
        const { uid, mobileNo } = contact;
        const response = await client.messages.create({
          body: messageBody,
          from: TWILIO.SENDER_NO,
          messagingServiceSid,
          to: mobileNo,
        });
        sendToUids.push(uid);
        result.push({
          status: 'success',
          mobileNo,
          id: response.sid,
        });
      }
    } catch (error) {
      handleServiceError(error, `${this.serviceName}`);
    } finally {
      messagesRef = await this.firebase.initCollection('messages').add({
        message: messageBody,
        timestamp: Timestamp.now(),
        uids: sendToUids,
      });
    }

    const messageData = await messagesRef.get();

    return {
      ...messageData.data(),
      timestamp: messageData.createTime.toDate(),
      id: messagesRef.id,
    };
  }
}
