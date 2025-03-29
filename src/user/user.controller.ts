import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from 'src/dto/user/user.dto';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  createUser(@Body() body: CreateUserDTO) {
    const { email, password, firstName, lastName, phoneNumber } = body;

    return this.userService.createUser({
      email,
      firstName,
      lastName,
      phoneNumber,
      password,
    });
  }

  @Post('update')
  updateUser(@Body() body: UpdateUserDTO) {
    const { id, firstName, lastName, phoneNumber } = body;

    return this.userService.updateUser({
      id,
      firstName,
      lastName,
      phoneNumber,
    });
  }
}
