import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { DatabaseModule } from 'src/database/database.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [DatabaseModule, FilesModule],
  providers: [BlogService],
  controllers: [BlogController]
})
export class BlogModule {}
