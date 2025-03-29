import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class SendMessageDTO {
  @IsPhoneNumber('PH', { each: true })
  phoneNumbers: string[];

  @IsNotEmpty()
  @IsString()
  message: string;
}
