import { Controller, Get, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async getAllStudents() {
    return this.studentService.getAll();
  }

  @Get(':id')
  async getStudentById(@Param(
    'id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })) id: number ) {
    return this.studentService.getStudentById(id)
  }
}
