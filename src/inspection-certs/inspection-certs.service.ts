import { Injectable } from '@nestjs/common';
import { CreateInspectionCertDto } from './dto/create-inspection-cert.dto';
import { UpdateInspectionCertDto } from './dto/update-inspection-cert.dto';

@Injectable()
export class InspectionCertsService {
  create(createInspectionCertDto: CreateInspectionCertDto) {
    return 'This action adds a new inspectionCert';
  }

  findAll() {
    return `This action returns all inspectionCerts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inspectionCert`;
  }

  update(id: number, updateInspectionCertDto: UpdateInspectionCertDto) {
    return `This action updates a #${id} inspectionCert`;
  }

  remove(id: number) {
    return `This action removes a #${id} inspectionCert`;
  }
}
