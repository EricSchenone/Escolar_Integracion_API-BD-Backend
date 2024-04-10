import { PartialType } from '@nestjs/mapped-types';
import { CityDto } from './create-city.dto';
import { IsString} from 'class-validator';

export class UpdateCityDto extends PartialType(CityDto) {

    @IsString()
    readonly name: string;
}
