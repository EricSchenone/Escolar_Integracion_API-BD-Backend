import { IsString } from 'class-validator';

export class SchoolDto {
    @IsString()
    readonly name : string;
    
    @IsString()
    readonly address: string;

}