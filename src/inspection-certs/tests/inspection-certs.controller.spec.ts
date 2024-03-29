import { Test, TestingModule } from '@nestjs/testing';
import { InspectionCertsController } from '../controllers/provider-inspection-certs.controller';
import { InspectionCertsService } from '../services/inspection-certs.service';

describe('InspectionCertsController', () => {
  let controller: InspectionCertsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InspectionCertsController],
      providers: [InspectionCertsService],
    }).compile();

    controller = module.get<InspectionCertsController>(
      InspectionCertsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
