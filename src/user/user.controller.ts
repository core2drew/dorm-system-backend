import { Body, Controller, Post } from '@nestjs/common';
import { CreateUser } from 'src/dto/user/create-user.dto';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  createUser(@Body() body: CreateUser) {
    const { email, password } = body;
    return this.userService.createUser(email, password);
  }
}
