import { PartialType } from '@nestjs/mapped-types';
import { CityDto } from './create-city.dto';

export class UpdateCityDto extends PartialType(CityDto) {}
