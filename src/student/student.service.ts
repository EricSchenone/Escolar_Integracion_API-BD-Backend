import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {

    constructor(@InjectRepository(Student)
    private readonly studentRepository: Repository<Student>){}

    async getAll(): Promise<Student[]> {
        const students: Student[] = await this.studentRepository.find();
        return students;
    }

    async getStudentById( id: number ): Promise<Student> {
        try{
            const criteria: FindOneOptions = { where: { id_student: id } }
            const student : Student = await this.studentRepository.findOne(criteria);
            if(student) return student;
            throw new Error('No existe un estudiante con el id:' + id)
        } catch(error) {
            throw new HttpException( {status: HttpStatus.NOT_FOUND,
            erro: 'Error en la busqueda' + error},
            HttpStatus.NOT_FOUND)
        }
    }
}
