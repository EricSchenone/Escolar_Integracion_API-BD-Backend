import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolModule } from './school/school.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'escolar',
      entities: [
        'dist/**/**.entity{.ts,.js}'
      ],
      synchronize: true
    }),
    CityModule,
    SchoolModule,
    StudentModule,
    TeacherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
