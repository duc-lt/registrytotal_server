import { Test, TestingModule } from '@nestjs/testing';
import { ProviderInspectionResultsController } from '../controllers/provider-inspection-results.controller';

describe('ProviderInspectionResultsController', () => {
  let controller: ProviderInspectionResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProviderInspectionResultsController],
    }).compile();

    controller = module.get<ProviderInspectionResultsController>(
      ProviderInspectionResultsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
