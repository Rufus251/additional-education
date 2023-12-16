import { Injectable } from '@nestjs/common';
import { FilesService } from './files/files.service';

@Injectable()
export class AppService {
  constructor(private readonly filesService: FilesService){}
  getHello(): string {
    return 'Hello World!';
  }

  async testUpload(file: Express.Multer.File){
      const fileName = await this.filesService.createPDFFile(file)
      console.log(fileName)
      return fileName
  }
}
