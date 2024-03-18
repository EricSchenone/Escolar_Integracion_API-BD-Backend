import { Controller, Get, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { SchoolService } from './school.service';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

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
}
