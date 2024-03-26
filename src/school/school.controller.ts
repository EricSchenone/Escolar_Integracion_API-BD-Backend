import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolDto } from './dto/create-school.dto';
import { School } from './entities/school.entity';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) { }

  @Post()
  createSchool(@Body() school: SchoolDto): Promise<School> {
    return this.schoolService.createSchool(school)
  }

  @Get()
  async getAllSchools() {
    return this.schoolService.getAllSchools();
  }

  @Get(':id')
  async getSchoolById(@Param(
    'id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })) id: number) {
    return this.schoolService.getSchoolById(id);
  }

  @Delete(':id')
  async deleteSchool(@Param(('id'), new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
  }))id: number): Promise<void> {
    return this.schoolService.deleteSchool(id)
  }
}
