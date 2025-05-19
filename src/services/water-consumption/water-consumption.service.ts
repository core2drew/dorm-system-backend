import { Injectable } from '@nestjs/common';
import { Timestamp } from 'firebase-admin/firestore';

import { FirebaseService } from 'src/modules/firebase/services/firebase-service/firebase-service';
import { handleServiceError } from 'src/shared/utils/error-handler.util';

import { CreateWaterConsumptionDTO } from 'src/dto/water-consumption/water-consumption.dto';
import { RoomService } from '../rooms/room-service';
@Injectable()
export class WaterConsumptionService {
  readonly serviceName = 'water-consumption-service';
  constructor(
    private firebase: FirebaseService,
    private roomService: RoomService,
  ) {}

  async createWaterConsumption(waterConsumption: CreateWaterConsumptionDTO) {
    try {
      const { roomId, consumption, flowRate, totalCubicMeters } =
        waterConsumption;
      const { uid, name: roomNo } = await this.roomService.getRoom(roomId);

      await this.firebase.initCollection('water_consumption').add({
        consumption,
        flowRate,
        roomNo,
        uid,
        totalCubicMeters,
        timestamp: Timestamp.now(),
      });
    } catch (error) {
      handleServiceError(error, `${this.serviceName}-create`);
    }
  }
}
