import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseRepository } from './firebase-repository';

describe('FirebaseRepository', () => {
  let service: FirebaseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirebaseRepository],
    }).compile();

    service = module.get<FirebaseRepository>(FirebaseRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
