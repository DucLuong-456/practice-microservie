import {
  Controller,
  Get,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfigOptions } from './multer.config';

@Controller('file')
export class FileController {
  constructor(
    @Inject('FILE_SERVICE') private readonly clientFileService: ClientProxy,
  ) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', multerConfigOptions))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.clientFileService.send({ cmd: 'upload' }, { file });
  }

  @Get()
  findAll() {
    return this.clientFileService.send({ cmd: 'find-all-file' }, {});
  }
}
