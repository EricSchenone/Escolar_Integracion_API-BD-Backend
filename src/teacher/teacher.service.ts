import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.intity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class TeacherService {

    constructor(@InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>) {}

    async getAll(): Promise<Teacher[]> {
        const teachers: Teacher[] = await this.teacherRepository.find();
        return teachers;
    }

    async getTeacherById( id: number ): Promise<Teacher> {
        try{
            const criteria : FindOneOptions = { where: { id_teacher: id } }
            const teacher = await this.teacherRepository.findOne(criteria)
            if(teacher) return teacher;
            throw new Error('No existe un porfesor registrado con el id:' + id)
        } catch(error) {
            throw new HttpException( { status: HttpStatus.NOT_FOUND,
            error: 'Error en la busqueda de ciudad.' + error},
            HttpStatus.NOT_FOUND);
        }
    }
}
