import { Module } from '@nestjs/common';
import { ServiceProvidersService } from './services/service-providers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceProvider } from './entities/service-provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceProvider])],
  providers: [ServiceProvidersService],
  exports: [ServiceProvidersService],
})
export class ServiceProvidersModule {}
