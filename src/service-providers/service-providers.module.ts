import { Module } from '@nestjs/common';
import { ServiceProvidersService } from './service-providers.service';
import { ServiceProvidersController } from './service-providers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceProvider } from './entities/service-provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceProvider])],
  controllers: [ServiceProvidersController],
  providers: [ServiceProvidersService],
})
export class ServiceProvidersModule {}
