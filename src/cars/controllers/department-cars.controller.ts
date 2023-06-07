import { HasRole } from '@accounts/decorators/role.decorator';
import { Role } from '@accounts/enums/role.enum';
import { JwtAuthGuard } from '@accounts/guards/jwt-auth.guard';
import { RolesGuard } from '@accounts/guards/roles.guard';
import { UploadCarsFromFileDto } from '@cars/dto/upload-cars-from-file.dto';
import { CarsService } from '@cars/services/cars.service';
import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { fileConfig } from '@xlsx/configs/file.config';

@Controller('department/cars')
export class DepartmentCarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post('upload')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadCarsFromFileDto })
  @UseGuards(JwtAuthGuard(Role.DEPARTMENT), RolesGuard)
  @HasRole(Role.DEPARTMENT)
  @UseInterceptors(FileInterceptor('file', fileConfig))
  async create(@UploadedFile() file: Express.Multer.File) {
    return this.carsService.create(file.path);
  }

  @Get('/search')
  @ApiBearerAuth()
  @ApiQuery({
    name: 'certnum',
    description: 'Biển số xe',
    required: true,
  })
  @UseGuards(JwtAuthGuard(Role.SERVICE_PROVIDER), RolesGuard)
  @HasRole(Role.SERVICE_PROVIDER)
  async searchByRegistrationNumber(@Query('certnum') certNumber: string) {
    return this.carsService.searchByRegistrationNumber(certNumber);
  }
}
