import { Car } from '@cars/entities/car.entity';
import { Repository } from 'typeorm';

export class CarRepository extends Repository<Car> {}
