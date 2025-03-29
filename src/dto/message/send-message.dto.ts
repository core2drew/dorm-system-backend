import { IsArray, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class SendMessageDTO {
  @IsArray()
  @IsPhoneNumber()
  phoneNumbers: string[];

  @IsNotEmpty()
  @IsString()
  message: string;
}
