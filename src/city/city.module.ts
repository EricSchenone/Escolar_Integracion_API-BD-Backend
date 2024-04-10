import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { School } from 'src/school/entities/school.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      City,
      School
    ])
  ],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
