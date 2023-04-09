import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressesModule } from './addresses/addresses.module';
import { OwnersModule } from './owners/owners.module';
import { CarsModule } from './cars/cars.module';
import { AccountsModule } from './accounts/accounts.module';
import { InspectionCertsModule } from './inspection-certs/inspection-certs.module';
import { ServiceProvidersModule } from './service-providers/service-providers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          autoLoadEntities: true,
          extra: {
            charset: 'UTF8_GENERAL_CI',
          },
        };
      },
      inject: [ConfigService],
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
