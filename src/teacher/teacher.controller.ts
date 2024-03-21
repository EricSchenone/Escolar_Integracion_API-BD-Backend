import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { SchoolDto } from 'src/school/dto/create-school.dto';
import { TeacherDto } from './dto/create-teacher.dto';
import { Teacher } from './entities/teacher.entity';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) { }

  @Post()
  async createSchool(teacher: TeacherDto): Promise<Teacher> {
    return this.teacherService.createTeacher(teacher);
  }

  @Get()
  async getAllTeachers() {
    return this.teacherService.getAll();
  }

  @Get(':id')
  async getTeacherById(@Param(
    'id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })) id: number) {
    return this.teacherService.getTeacherById(id)
  }

  @Put(':id')
  async updateTeacher(
    @Param(('id'), new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })) id: number,
    @Body() teacher: TeacherDto): Promise<Teacher> {
    return this.teacherService.updateTeacher(id, teacher);
  }
}
