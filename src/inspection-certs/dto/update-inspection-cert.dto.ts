import { PartialType } from '@nestjs/swagger';
import { CreateInspectionCertDto } from './create-inspection-cert.dto';

export class UpdateInspectionCertDto extends PartialType(CreateInspectionCertDto) {}
