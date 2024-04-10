import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from 'src/school/entities/school.entity';
import { Student } from 'src/student/entities/student.entity';
import { Course } from './entities/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Course,
      School,
      Student
    ])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
