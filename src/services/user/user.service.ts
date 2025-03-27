import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  createUser(email: string, password: string) {
    console.log(email, password);
    return null;
  }
}
