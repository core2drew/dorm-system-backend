import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WaterConsumptionDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  roomId: string;

  @IsNotEmpty()
  @IsNumber()
  consumption: number;

  @IsNotEmpty()
  @IsNumber()
  flowRate: number;

  @IsNotEmpty()
  @IsNumber()
  totalCubicMeters: number;
}

export type CreateWaterConsumptionDTO = Omit<WaterConsumptionDTO, 'id'>;
