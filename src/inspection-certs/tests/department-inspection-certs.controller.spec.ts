import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentInspectionCertsController } from '../controllers/department-inspection-certs.controller';

describe('DepartmentInspectionCertsController', () => {
  let controller: DepartmentInspectionCertsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentInspectionCertsController],
    }).compile();

    controller = module.get<DepartmentInspectionCertsController>(
      DepartmentInspectionCertsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
