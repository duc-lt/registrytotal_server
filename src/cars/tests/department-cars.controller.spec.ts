import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentCarsController } from './department-cars.controller';

describe('DepartmentCarsController', () => {
  let controller: DepartmentCarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentCarsController],
    }).compile();

    controller = module.get<DepartmentCarsController>(DepartmentCarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
