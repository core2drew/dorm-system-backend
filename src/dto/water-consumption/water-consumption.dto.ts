import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';
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

export class CreateWaterConsumptionDTO extends OmitType(WaterConsumptionDTO, [
  'id',
] as const) {}
