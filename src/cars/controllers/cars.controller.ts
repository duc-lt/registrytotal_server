import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CarsService } from '../services/cars.service';
import { CreateCarDto } from '../dto/create-car.dto';
import { UpdateCarDto } from '../dto/update-car.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@accounts/guards/jwt-auth.guard';
import { Role } from '@accounts/enums/role.enum';
import { RolesGuard } from '@accounts/guards/roles.guard';
import { HasRole } from '@accounts/decorators/role.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileConfig } from '@xlsx/configs/file.config';
import { UploadCarsFromFileDto } from '@cars/dto/upload-cars-from-file.dto';

@Controller('cars')
@ApiTags('[Cars]')
@ApiBearerAuth()
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadCarsFromFileDto })
  // @UseGuards(JwtAuthGuard(Role.DEPARTMENT), RolesGuard)
  // @HasRole(Role.DEPARTMENT)
  @UseInterceptors(FileInterceptor('file', fileConfig))
  async create(@UploadedFile() file: Express.Multer.File) {
    return this.carsService.create(file.path);
  }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }
}
