import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, isValidObjectId } from 'mongoose';
import * as _ from 'lodash';
import { SearchUserDto } from './dto/search-user.dto';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({
      user_name: createUserDto.user_name,
    });
    if (user) throw new HttpException('User existed!', HttpStatus.BAD_REQUEST);
    const new_user = await this.userModel.create(createUserDto);
    return new_user;
  }

  async findAll(searchUserDto: SearchUserDto) {
    const { limit, page } = searchUserDto;
    const skip = limit * (page - 1);

    const totalCount = await this.userModel.countDocuments();
    if (skip >= totalCount) {
      console.log(skip, totalCount);
      throw new HttpException(
        'Page number exceeds total pages available.',
        HttpStatus.FORBIDDEN,
      );
    }
    const users = await this.userModel.find().limit(limit).skip(skip);
    if (_.isEmpty(users))
      throw new HttpException('Users is empty!', HttpStatus.FORBIDDEN);
    console.log('users', users);
    return users;
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const user: User = await this.userModel.findById(id);
    if (!user)
      throw new HttpException('User is not found!', HttpStatus.NOT_FOUND);

    return user;
  }
  async findOneByName(user_name: string) {
    const user: User = await this.userModel.findOne({ user_name: user_name });
    if (!user)
      throw new HttpException('User is not found!', HttpStatus.NOT_FOUND);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    await this.userModel.findOneAndUpdate({ _id: id }, updateUserDto);
    return user;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.userModel.findOneAndDelete({ _id: id });
    return user;
  }
}
