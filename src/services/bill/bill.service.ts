import { Injectable } from '@nestjs/common';
import { Timestamp } from 'firebase-admin/firestore';

import { FirebaseService } from 'src/modules/firebase/services/firebase-service/firebase-service';
import {
  TenantConsumptionBill,
  WaterConsumptionSummary,
} from './models/bill.model';
import { User } from '../user/models/user.model';
@Injectable()
export class BillService {
  readonly serviceName = 'bill-service';
  constructor(private firebase: FirebaseService) {}

  async getTenantsConsumptionAndBill(
    users: Array<User>,
  ): Promise<Array<TenantConsumptionBill>> {
    const now = Timestamp.now().toDate();

    const userBill = await Promise.all(
      users.map(async ({ id, ...rest }) => {
        const bill = await this.computeTenantConsumptionAndBill(id, now);
        return {
          id,
          bill,
          ...rest,
        };
      }),
    );
    const filteredUserWithRecord = await userBill.filter(
      (d) => !!d.bill.totalConsumption,
    );
    return filteredUserWithRecord;
  }

  private async computeTenantConsumptionAndBill(
    uid: string,
    date: Date,
  ): Promise<WaterConsumptionSummary> {
    let totalPricePerMeter = 0;
    let totalConsumption = 0;
    let recordCount = 0;
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const startOfNextMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      1,
    );

    const startTimestamp = Timestamp.fromDate(startOfMonth);
    const endTimestamp = Timestamp.fromDate(startOfNextMonth);

    const snapshot = await this.firebase
      .initCollection('water_consumption')
      .where('uid', '==', uid)
      .where('timestamp', '>=', startTimestamp)
      .where('timestamp', '<', endTimestamp)
      .get();

    snapshot.forEach((doc) => {
      const data = doc.data();
      totalPricePerMeter += data.pricePerMeter;
      totalConsumption += data.consumption;
      recordCount++;
    });

    const averagePricePerMeter = totalPricePerMeter / recordCount;
    totalPricePerMeter = !isNaN(averagePricePerMeter)
      ? averagePricePerMeter
      : 0;
    const totalBill = averagePricePerMeter * totalConsumption;
    return {
      totalPricePerMeter,
      totalConsumption,
      totalBill,
    };
  }
}
