import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { School } from './entities/school.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, QueryFailedError, Repository } from 'typeorm';
import { SchoolDto } from './dto/create-school.dto';
import { NotFoundError } from 'rxjs';


@Injectable()
export class SchoolService {

    constructor(@InjectRepository(School)
    private readonly schoolRepository: Repository<School>) { }

    async createSchool(schoolDto: SchoolDto): Promise<School> {
        try {
            const school: School = new School(schoolDto.name, schoolDto.address);
            school.setNmae(schoolDto.name);
            school.setAddress(schoolDto.address);
            const savedSchool = await this.schoolRepository.save(school);
            if (savedSchool.getIdSchool()) return school;
            throw new BadRequestException('No se pudo cargar la escuela')
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new HttpException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error en la consulta a la base de datos'
                },
                    HttpStatus.INTERNAL_SERVER_ERROR)
            };
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Error en la creación de la escuela'
            },
                HttpStatus.BAD_REQUEST)


        }
    }

    async getAllSchools(): Promise<School[]> {
        const schools: School[] = await this.schoolRepository.find();
        return schools;

    }

    async getSchoolById(id: number): Promise<School> {
        try {
            const criteria: FindOneOptions = { where: { id_school: id } }
            const school: School = await this.schoolRepository.findOne(criteria);
            if (school) return school;
            throw new NotFoundException('No existe una escuela con el id:' + id)
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new HttpException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error en la consulta a la base de datos'
                },
                    HttpStatus.INTERNAL_SERVER_ERROR)
            };
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la consulta de la escuela'
            },
                HttpStatus.NOT_FOUND)

        }
    }

    async updateSchool(id: number, schoolDto: SchoolDto): Promise<School> {
        try {
            const criteria: FindOneOptions = { where: { id_school: id } };
            let updateSchool = await this.schoolRepository.findOne(criteria);  
            updateSchool.setNmae(schoolDto.name);
            updateSchool.setAddress(schoolDto.address);
            updateSchool = await this.schoolRepository.save(updateSchool);
            return updateSchool;
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new HttpException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error en la actualizacion de la escuela en la base de datos'
                },
                    HttpStatus.INTERNAL_SERVER_ERROR)
            };
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Error en la actualizacion de la escuela, no se encuentra una escuela con id:' + id
            },
                HttpStatus.BAD_REQUEST)
        }
    }

    async deleteSchool(id: number): Promise<void> {
        try {
            const criteria: FindOneOptions = { where: { id_school: id } };
            const school: School = await this.schoolRepository.findOne(criteria)
            if (!school) throw new NotFoundException('No existe una escuela con el id:' + id)
            await this.schoolRepository.delete(school.getIdSchool());
    
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new HttpException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error en la eliminación de la escuela en la base de datos'
                }, HttpStatus.INTERNAL_SERVER_ERROR)
            };
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la eliminación de la escuela'
            },
                HttpStatus.NOT_FOUND)
        }
    }
}

