import { IsString, IsDate } from 'class-validator';

export class StudentDto {
    @IsString()
    readonly name : string;

    @IsString()
    readonly lastname : string;
    
    @IsDate()
    readonly birthday: Date;
}