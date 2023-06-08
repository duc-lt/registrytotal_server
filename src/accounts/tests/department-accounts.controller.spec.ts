import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentAccountsController } from '../controllers/department-accounts.controller';

describe('DepartmentAccountsController', () => {
  let controller: DepartmentAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentAccountsController],
    }).compile();

    controller = module.get<DepartmentAccountsController>(
      DepartmentAccountsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
