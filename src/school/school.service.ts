import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { School } from './entities/school.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class SchoolService {

    constructor(@InjectRepository(School)
    private readonly schoolReposytory: Repository<School>) { }

    async getAllSchools(): Promise<School[]> {
        const schools: School[] = await this.schoolReposytory.find();
        return schools;

    }

    async getSchoolById(id: number): Promise<School> {
        try {
            const criteria: FindOneOptions = { where: { id_school: id } }
            const school: School = await this.schoolReposytory.findOne(criteria);
            if (school) return school;
            throw new Error('No existe una escuela con el id:' + id)
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND,
            error : 'Error en la busqueda de escuela' + error},
            HttpStatus.NOT_FOUND);

        }
    }
}

