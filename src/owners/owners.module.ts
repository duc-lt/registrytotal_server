import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Person } from './entities/person.entity';
import { Organisation } from './entities/organisation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Owner, Person, Organisation])],
  controllers: [OwnersController],
  providers: [OwnersService],
})
export class OwnersModule {}
