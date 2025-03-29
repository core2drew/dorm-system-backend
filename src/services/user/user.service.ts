import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';
import { Role } from 'src/enums/role.enum';

import { FirebaseService } from 'src/modules/firebase/services/firebase-service/firebase-service';

@Injectable()
export class UserService {
  constructor(private firebaseRepo: FirebaseService) {}
  test() {
    throw new Error('test');
  }
  async createUser(user: CreateUserDTO) {
    try {
      const { uid } = await this.firebaseRepo.auth.createUser(user);
      const userRef = this.firebaseRepo.initCollection('users').doc(uid);

      await userRef.set({
        id: uid,
        ...user,
        role: Role.TENANT,
        isActive: true,
      });
      return uid;
    } catch (error) {
      if (error.code) {
        throw new BadRequestException(`Error: ${error.message}`);
      }

      throw new InternalServerErrorException(
        `User creation failed: ${error.message}`,
      );
    }
  }
}
