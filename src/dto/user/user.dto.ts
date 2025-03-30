import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  id: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  mobileNo: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
}

export type CreateUserDTO = Omit<UserDTO, 'id'>;

export type UpdateUserDTO = Partial<Omit<UserDTO, 'email'>>;
