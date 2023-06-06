import { Module } from '@nestjs/common';
import { OwnersService } from './services/owners.service';
import { OwnersController } from './owners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Person } from './entities/person.entity';
import { Organisation } from './entities/organisation.entity';
import { AddressesModule } from '@addresses/addresses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Owner, Person, Organisation]),
    AddressesModule,
  ],
  controllers: [OwnersController],
  providers: [OwnersService],
  exports: [OwnersService],
})
export class OwnersModule {}
