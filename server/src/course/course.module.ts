import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { DatabaseModule } from 'src/database/database.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [DatabaseModule, FilesModule],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
