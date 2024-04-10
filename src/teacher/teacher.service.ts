import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { FindManyOptions, FindOneOptions, QueryFailedError, Repository } from 'typeorm';
import { TeacherDto } from './dto/create-teacher.dto';

@Injectable()
export class TeacherService {

    constructor(@InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>) {}

    async createTeacher( teacherDto : TeacherDto ): Promise<Teacher> {
        try {
            const teacher: Teacher = new Teacher(teacherDto.name, teacherDto.lastname);
            teacher.setName(teacherDto.name);
            teacher.setLastname(teacherDto.lastname);
            const savedTeacher : Teacher = await this.teacherRepository.save(teacher);
            if (savedTeacher.getIdTeacher()) return teacher;
            throw new Error('No se pudo registrar el profesor')
        } catch(error) {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST,
            error: error},
            HttpStatus.BAD_REQUEST)
        }
    }

    async getAll(): Promise<Teacher[]> {
        const criteria: FindManyOptions = { relations:['classes']};
        const teachers: Teacher[] = await this.teacherRepository.find(criteria);
        return teachers;
    }

    async getTeacherById( id: number ): Promise<Teacher> {
        try{
            const criteria : FindOneOptions = { relations:['classes'], where: { id_teacher: id } }
            const teacher = await this.teacherRepository.findOne(criteria)
            if(teacher) return teacher;
            throw new Error('No existe un porfesor registrado con el id:' + id)
        } catch(error) {
            throw new HttpException( { status: HttpStatus.NOT_FOUND,
            error: 'Error en la busqueda de ciudad.' + error},
            HttpStatus.NOT_FOUND);
        }
    }

    
    async updateTeacher(id: number, teacherDto: TeacherDto): Promise<Teacher> {
        try {
            const criteria: FindOneOptions = { where: { id_teacher: id } };
            let updateTeacher = await this.teacherRepository.findOne(criteria);
            if (!updateTeacher) throw new Error('No se encuentra un alumno con id:' + id),
                updateTeacher.setName(teacherDto.name);
                updateTeacher.setLastname(teacherDto.lastname);
            updateTeacher = await this.teacherRepository.save(updateTeacher);
            return updateTeacher;
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new HttpException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error en la actualizacion del profesor en la base de datos'
                },
                    HttpStatus.INTERNAL_SERVER_ERROR)
            };
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Error en la actualizacion del profesor'
            },
                HttpStatus.BAD_REQUEST)
        }
    }

    async deleteTeacher(id: number): Promise<void> {
        try {
            const criteria: FindOneOptions = { where: { id_school: id } };
            const teacher: Teacher = await this.teacherRepository.findOne(criteria)
            if (!teacher) throw new NotFoundException('No existe una escuela con el id:' + id)
            await this.teacherRepository.delete(teacher.getIdTeacher());
    
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new HttpException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error en la eliminación del profesor en la base de datos'
                }, HttpStatus.INTERNAL_SERVER_ERROR)
            };
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la eliminación del profesor'
            },
                HttpStatus.NOT_FOUND)
        }
    }
}
