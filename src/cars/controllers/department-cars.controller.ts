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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { fileConfig } from '@xlsx/configs/file.config';

@ApiTags('[Cục đăng kiểm][Car] Ô tô')
@Controller('department/cars')
export class DepartmentCarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post('upload')
  @ApiOperation({
    summary: 'Upload file để tạo CSDL phương tiện đã qua đăng ký',
    operationId: 'create',
  })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadCarsFromFileDto })
  @UseGuards(JwtAuthGuard(Role.DEPARTMENT), RolesGuard)
  @HasRole(Role.DEPARTMENT)
  @UseInterceptors(FileInterceptor('file', fileConfig))
  async create(@UploadedFile() file: Express.Multer.File) {
    return this.carsService.create(file.path);
  }

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách ô tô',
    operationId: 'findAll',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard(Role.DEPARTMENT), RolesGuard)
  @HasRole(Role.DEPARTMENT)
  async findAll() {
    return this.carsService.findAll();
  }
}
