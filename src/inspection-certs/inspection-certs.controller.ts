import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InspectionCertsService } from './inspection-certs.service';
import { CreateInspectionCertDto } from './dto/create-inspection-cert.dto';
import { UpdateInspectionCertDto } from './dto/update-inspection-cert.dto';

@Controller('inspection-certs')
export class InspectionCertsController {
  constructor(private readonly inspectionCertsService: InspectionCertsService) {}

  @Post()
  create(@Body() createInspectionCertDto: CreateInspectionCertDto) {
    return this.inspectionCertsService.create(createInspectionCertDto);
  }

  @Get()
  findAll() {
    return this.inspectionCertsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inspectionCertsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInspectionCertDto: UpdateInspectionCertDto) {
    return this.inspectionCertsService.update(+id, updateInspectionCertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inspectionCertsService.remove(+id);
  }
}
