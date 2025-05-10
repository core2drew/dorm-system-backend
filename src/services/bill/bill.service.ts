import { Injectable } from '@nestjs/common';

import { FirebaseService } from 'src/modules/firebase/services/firebase-service/firebase-service';
@Injectable()
export class BillService {
  readonly serviceName = 'bill-service';
  constructor(private firebase: FirebaseService) {}

  // TODO - create a method for computing each user current month bill.
}
