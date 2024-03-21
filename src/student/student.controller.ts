import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { StudentDto } from './dto/create-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async createStudent( student: StudentDto): Promise<Student> {
    return this.studentService.createStudent(student);
  }

  @Get()
  async getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @Get(':id')
  async getStudentById(@Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })) id: number ): Promise<Student> {
    return this.studentService.getStudentById(id)
  }

  @Put(':id')
  async updateStudent(@Param('id', new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
    ) id: number,
    @Body() student: StudentDto): Promise<Student> {
      return this.studentService.updateStudent(id, student)
  }
/*
  @Get()
  getStudentsByLastName(@Query('lastname') lastname?: string): Promise<Student[]> {
    if(!lastname) return this.studentService.getStudentsByLastname(lastname);
  }*/
}
