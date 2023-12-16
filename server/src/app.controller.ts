import { Body, Controller, Get, Post, Put,UploadedFile, UseInterceptors, } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse } from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("testUpload")
  @ApiResponse({ status: 200, description: 'Return userInfo' })
  @UseInterceptors(FileInterceptor('file'))
  async testUpload(@UploadedFile() file: Express.Multer.File) {
    const res = await this.appService.testUpload(file)
    return res
  }
}
