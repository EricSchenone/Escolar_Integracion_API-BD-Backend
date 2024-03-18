import { Controller, Get, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { TeacherService } from './teacher.service';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

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
}
