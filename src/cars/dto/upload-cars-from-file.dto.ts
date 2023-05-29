import { ApiProperty } from '@nestjs/swagger';

export class UploadCarsFromFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;
}
