import { Injectable } from '@nestjs/common';
import { Timestamp } from 'firebase-admin/firestore';

import { FirebaseService } from 'src/modules/firebase/services/firebase-service/firebase-service';
@Injectable()
export class BillService {
  readonly serviceName = 'bill-service';
  constructor(private firebase: FirebaseService) {}

  async computeTenantConsumptionAndBill(uid: string, date: Date) {
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
    return {
      totalPricePerMeter,
      totalConsumption,
    };
  }
}
