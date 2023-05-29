import { Module } from '@nestjs/common';
import { ServiceProvidersService } from './services/service-providers.service';
import { ServiceProvidersController } from './controllers/service-providers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceProvider } from './entities/service-provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceProvider])],
  controllers: [ServiceProvidersController],
  providers: [ServiceProvidersService],
  exports: [ServiceProvidersService],
})
export class ServiceProvidersModule {}
