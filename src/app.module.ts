import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressesModule } from './addresses/addresses.module';
import { OwnersModule } from './owners/owners.module';
import { CarsModule } from './cars/cars.module';
import { AccountsModule } from './accounts/accounts.module';
import { InspectionCertsModule } from './inspection-certs/inspection-certs.module';
import { ServiceProvidersModule } from './service-providers/service-providers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    OwnersModule,
    AddressesModule,
    CarsModule,
    AccountsModule,
    InspectionCertsModule,
    ServiceProvidersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
