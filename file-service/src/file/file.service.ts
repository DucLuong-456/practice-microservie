import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { File, FileDocument } from './schemas/file.schema';
@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}
  async create(file: Express.Multer.File) {
    const createFile = await this.fileModel.create({
      file_name: file.filename,
      path: `${process.env.BASE_URL}/${file.filename}`,
    });
    return createFile;
  }

  async findAll() {
    const files = await this.fileModel.find();
    return files;
  }
}
