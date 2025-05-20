import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/modules/firebase/services/firebase-service/firebase-service';
import { handleServiceError } from 'src/shared/utils/error-handler.util';

@Injectable()
export class MetaService {
  readonly serviceName = 'meta-service';
  constructor(private firebase: FirebaseService) {}

  async getYears(): Promise<Array<string>> {
    try {
      const yearsRef = this.firebase.initCollection('meta').doc('years');

      const years = await yearsRef.get();
      const { availableYears } = years.data();

      return availableYears;
    } catch (error) {
      handleServiceError(error, `${this.serviceName}-get-years`);
    }
  }

  async addYear(year: string): Promise<void> {
    try {
      const yearsRef = this.firebase.initCollection('meta').doc('years');

      const years = await yearsRef.get();

      if (years.exists) {
        const { availableYears } = years.data();
        const yearSet = new Set(availableYears);

        await yearsRef.update({
          availableYears: Array.from(yearSet),
        });
      } else {
        yearsRef.set({
          availableYears: [year],
        });
      }
    } catch (error) {
      handleServiceError(error, `${this.serviceName}-add-year`);
    }
  }
}
