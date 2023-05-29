import { Test, TestingModule } from '@nestjs/testing';
import { InspectionCertsService } from '../services/inspection-certs.service';

describe('InspectionCertsService', () => {
  let service: InspectionCertsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InspectionCertsService],
    }).compile();

    service = module.get<InspectionCertsService>(InspectionCertsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
