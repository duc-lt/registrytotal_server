import { Module } from '@nestjs/common';
import { XlsxService } from './services/xlsx.service';

@Module({
  providers: [XlsxService],
  exports: [XlsxService],
})
export class XlsxModule {}
