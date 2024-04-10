import  { IsString } from 'class-validator';

export class TeacherDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly lastname: string;
    
}