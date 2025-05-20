import { Injectable } from '@nestjs/common';
import { Timestamp } from 'firebase-admin/firestore';

import { FirebaseService } from 'src/modules/firebase/services/firebase-service/firebase-service';
import { handleServiceError } from 'src/shared/utils/error-handler.util';

import { CreateWaterConsumptionDTO } from 'src/dto/water-consumption/water-consumption.dto';
import { RoomService } from '../rooms/room-service';
import { MetaService } from '../meta/meta-service';
import { format } from 'date-fns';
@Injectable()
export class WaterConsumptionService {
  readonly serviceName = 'water-consumption-service';
  constructor(
    private firebase: FirebaseService,
    private roomService: RoomService,
    private metaService: MetaService,
  ) {}

  async createWaterConsumption(waterConsumption: CreateWaterConsumptionDTO) {
    try {
      const { roomId, consumption, flowRate, totalCubicMeters } =
        waterConsumption;
      const { uid, name: roomNo } = await this.roomService.getRoom(roomId);
      const currentYear = new Date('2026').getFullYear();
      this.metaService.addYear(currentYear);

      await this.firebase.initCollection('water_consumption').add({
        consumption,
        flowRate,
        roomNo,
        uid,
        totalCubicMeters,
        year: currentYear,
        timestamp: Timestamp.now(),
      });
    } catch (error) {
      handleServiceError(error, `${this.serviceName}-create`);
    }
  }
}
