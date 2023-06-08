import { Test, TestingModule } from '@nestjs/testing';
import { ProviderAccountsController } from '../controllers/provider-accounts.controller';

describe('ProviderAccountsController', () => {
  let controller: ProviderAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProviderAccountsController],
    }).compile();

    controller = module.get<ProviderAccountsController>(
      ProviderAccountsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
