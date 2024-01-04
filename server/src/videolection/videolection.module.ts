import { Module } from '@nestjs/common';
import { VideolectionController } from './videolection.controller';
import { VideolectionService } from './videolection.service';
import { DatabaseModule } from 'src/database/database.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [DatabaseModule, FilesModule],
  controllers: [VideolectionController],
  providers: [VideolectionService]
})
export class VideolectionModule {}
