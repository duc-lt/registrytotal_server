import { AddressesService } from '@addresses/services/addresses.service';
import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get('province')
  @ApiQuery({
    name: 'province_code',
    type: Number,
  })
  async findProvinceByCode(
    @Query('province_code', ParseIntPipe) provinceCode: number,
  ) {
    return this.addressesService.findProvinceByCode(provinceCode);
  }

  @Get('district')
  @ApiQuery({
    name: 'province_code',
    type: Number,
  })
  @ApiQuery({
    name: 'district_code',
    type: Number,
  })
  async findDistrictByCode(
    @Query('province_code', ParseIntPipe) provinceCode: number,
    @Query('district_code', ParseIntPipe) districtCode: number,
  ) {
    return this.addressesService.findDistrictByCode(districtCode, provinceCode);
  }

  @Get('commune')
  @ApiQuery({
    name: 'province_code',
    type: Number,
  })
  @ApiQuery({
    name: 'district_code',
    type: Number,
  })
  @ApiQuery({
    name: 'commune_code',
    type: Number,
  })
  async findCommuneByCode(
    @Query('province_code', ParseIntPipe) provinceCode: number,
    @Query('district_code', ParseIntPipe) districtCode: number,
    @Query('commune_code', ParseIntPipe) communeCode: number,
  ) {
    return this.addressesService.findCommuneByCode(
      communeCode,
      districtCode,
      provinceCode,
    );
  }
}
