import { Test, TestingModule } from '@nestjs/testing';
import { ProviderCarsController } from '../controllers/provider-cars.controller';

describe('ProviderCarsController', () => {
  let controller: ProviderCarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProviderCarsController],
    }).compile();

    controller = module.get<ProviderCarsController>(ProviderCarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
