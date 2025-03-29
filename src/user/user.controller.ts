import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  createTenant(@Body() body: CreateUserDTO) {
    const { email, password, firstName, lastName, phoneNumber } = body;

    return this.userService.createUser({
      email,
      firstName,
      lastName,
      phoneNumber,
      password,
    });
  }
}
