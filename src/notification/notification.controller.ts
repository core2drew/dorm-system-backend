import { Controller, Post } from '@nestjs/common';
import { BillService } from 'src/services/bill/bill.service';
import { MessageService } from 'src/services/message/message.service';
import { UserService } from 'src/services/user/user.service';
import { notifBillTemplate } from './notification-sms.template';

@Controller('notification')
export class NotificationController {
  constructor(
    private messageService: MessageService,
    private billService: BillService,
    private userService: UserService,
  ) {}

  private async generateNotifications() {
    const users = await this.userService.getUsers();
    const userBills =
      await this.billService.getTenantsConsumptionAndBill(users);

    const notifs = userBills.map((userBill) => {
      const { mobileNo } = userBill;
      return {
        message: notifBillTemplate(userBill),
        mobileNo,
      };
    });

    return notifs;
  }

  @Post('send-bill')
  sendMessage() {
    // TODO get user account details

    return this.generateNotifications();
  }
}
