import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from 'src/dto/user/user.dto';
import { Role } from 'src/enums/role.enum';

import { FirebaseService } from 'src/modules/firebase/services/firebase-service/firebase-service';

@Injectable()
export class UserService {
  constructor(private firebaseRepo: FirebaseService) {}
  errorHandler(error) {
    if (error.code) {
      throw new BadRequestException(`Error: ${error.message}`);
    }

    throw new InternalServerErrorException(
      `User creation failed: ${error.message}`,
    );
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
      const userData = await userRef.get();

      return userData.data();
    } catch (error) {
      this.errorHandler(error);
    }
  }

  async updateUser(user: UpdateUserDTO) {
    try {
      const { uid } = await this.firebaseRepo.auth.updateUser(user.id, {
        ...user,
      });
      const userRef = this.firebaseRepo.initCollection('users').doc(uid);
      await userRef.update({
        ...user,
      });
      const userData = await userRef.get();

      return userData.data();
    } catch (error) {
      this.errorHandler(error);
    }
  }
}
