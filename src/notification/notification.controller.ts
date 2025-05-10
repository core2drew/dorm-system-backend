import { Controller, Post } from '@nestjs/common';
import { BillService } from 'src/services/bill/bill.service';
import { Timestamp } from 'firebase-admin/firestore';
import { MessageService } from 'src/services/message/message.service';
import { UserService } from 'src/services/user/user.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private billService: BillService,
  ) {}

  private async getTenantConsumptionAndBill() {
    const users = await this.userService.getUsers();
    const now = Timestamp.now().toDate();

    const userBill = await Promise.all(
      users.map(async ({ id, firstName, lastName }) => {
        const bill = await this.billService.computeTenantConsumptionAndBill(
          id,
          now,
        );
        return {
          id,
          firstName,
          lastName,
          bill,
        };
      }),
    );
    const filteredUserWithRecord = await userBill.filter(
      (d) => !!d.bill.totalConsumption,
    );
    return filteredUserWithRecord;
  }

  private async generateNotifications() {
    const userBill = await this.getTenantConsumptionAndBill();
  }

  @Post('send-bill')
  sendMessage() {
    // TODO get user account details
    const notifs = this.generateNotifications();
    return [];
  }
}
