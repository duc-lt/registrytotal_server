import { Test, TestingModule } from '@nestjs/testing';
import { ServiceProvidersController } from '../controllers/service-providers.controller';
import { ServiceProvidersService } from '../services/service-providers.service';

describe('ServiceProvidersController', () => {
  let controller: ServiceProvidersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceProvidersController],
      providers: [ServiceProvidersService],
    }).compile();

    controller = module.get<ServiceProvidersController>(
      ServiceProvidersController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
