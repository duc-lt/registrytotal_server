import { Test, TestingModule } from '@nestjs/testing';
import { InspectionResultsService } from './inspection-results.service';

describe('InspectionResultsService', () => {
  let service: InspectionResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InspectionResultsService],
    }).compile();

    service = module.get<InspectionResultsService>(InspectionResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
