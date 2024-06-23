import { Controller, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileService } from './file.service';
// import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfigOptions } from 'src/config/multer.config';
import { MessagePattern } from '@nestjs/microservices';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  // @Post('/upload')
  @MessagePattern({ cmd: 'upload' })
  @UseInterceptors(FileInterceptor('file', multerConfigOptions))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.create(file);
  }
  // @Get()
  @MessagePattern({ cmd: 'find-all-file' })
  findAll() {
    return this.fileService.findAll();
  }
}
