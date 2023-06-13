import { AddressesService } from '@addresses/services/addresses.service';
import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get('provinces')
  async findProvinces() {
    return this.addressesService.findProvinces();
  }

  @Get('districts')
  @ApiQuery({
    name: 'province_code',
    type: Number,
  })
  async findDistricts(
    @Query('province_code', ParseIntPipe) provinceCode: number,
  ) {
    return this.addressesService.findDistricts(provinceCode);
  }

  @Get('communes')
  @ApiQuery({
    name: 'province_code',
    type: Number,
  })
  @ApiQuery({
    name: 'district_code',
    type: Number,
  })
  async findCommuneByCode(
    @Query('province_code', ParseIntPipe) provinceCode: number,
    @Query('district_code', ParseIntPipe) districtCode: number,
  ) {
    return this.addressesService.findCommunes(districtCode, provinceCode);
  }
}
