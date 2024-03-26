import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, QueryFailedError, Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { StudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {

    constructor(@InjectRepository(Student)
    private readonly studentRepository: Repository<Student>) { }

    async createStudent(studentDto: StudentDto): Promise<Student> {
        try {
            const student: Student = new Student(studentDto.name, studentDto.lastname, studentDto.birthday);
            student.setName(studentDto.name);
            student.setLastname(studentDto.lastname);
            student.setBirthday(studentDto.birthday);
            const savedStudent: Student = await this.studentRepository.save(student);
            if (savedStudent.getIdStudent()) return student;
            throw new Error('No se pudo registrar al alumno');
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new HttpException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error en el registro del alumno en la base de datos'
                },
                    HttpStatus.INTERNAL_SERVER_ERROR)
            };
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Error en el registro del alumno'
            },
                HttpStatus.BAD_REQUEST)
        }
    }


    async getAllStudents(): Promise<Student[]> {
        const students: Student[] = await this.studentRepository.find();
        return students;
    }

    async getStudentById(id: number): Promise<Student> {
        try {
            const criteria: FindOneOptions = { where: { id_student: id } }
            const student: Student = await this.studentRepository.findOne(criteria);
            if (student) return student;
            throw new Error('No existe un estudiante con el id:' + id)
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
                error: 'Error en la consulta del alumno'
            },
                HttpStatus.BAD_REQUEST)
        }
    }


    async updateStudent(id: number, studentDto: StudentDto): Promise<Student> {
        try {
            const criteria: FindOneOptions = { where: { id_student: id } };
            let updateStudent = await this.studentRepository.findOne(criteria);
            if (!updateStudent) throw new Error('No se encuentra un alumno con id:' + id),
                updateStudent.setName(studentDto.name);
                updateStudent.setLastname(studentDto.lastname);
                updateStudent.setBirthday(studentDto.birthday);
            updateStudent = await this.studentRepository.save(updateStudent);
            return updateStudent;
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new HttpException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error en la actualizacion del alumno en la base de datos'
                },
                    HttpStatus.INTERNAL_SERVER_ERROR)
            };
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Error en la actualizacion del alumno'
            },
                HttpStatus.BAD_REQUEST)
        }
    }

    async deleteStudent(id: number): Promise<void> {
        try {
            const criteria: FindOneOptions = { where: { id_student: id } };
            const student: Student = await this.studentRepository.findOne(criteria)
            if (!student) throw new NotFoundException('No existe una escuela con el id:' + id)
            await this.studentRepository.delete(student.getIdStudent());
    
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new HttpException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error en la eliminación del estudiante en la base de datos'
                }, HttpStatus.INTERNAL_SERVER_ERROR)
            };
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la eliminación del estudiante'
            },
                HttpStatus.NOT_FOUND)
        }
    }


}
