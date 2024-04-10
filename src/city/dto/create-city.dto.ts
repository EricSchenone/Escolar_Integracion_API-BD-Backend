import { IsString } from 'class-validator';

export class CityDto {
    @IsString()
    readonly name: string;
}
