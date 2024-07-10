import {
  Controller,
  Body,
  Param,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagePattern } from '@nestjs/microservices';
import { HttpExceptionFilter } from 'src/common/exception/httException.filter';
import { handleResponseInterceptor } from 'src/common/interceptor/handle.response';
import { PagingResponse } from 'src/common/types/pagingResponse.type';
import { SearchUserDto } from './dto/search-user.dto';
import { BaseResponse } from 'src/common/types/baseResponse.type';

@Controller('users')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(handleResponseInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'create-user' })
  async create(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'get-all-user' })
  async findAll(searchUserDto: SearchUserDto) {
    const data = await this.usersService.findAll(searchUserDto);

    return new PagingResponse(data, {
      count: data.length,
      page: searchUserDto.page,
      limit: searchUserDto.limit,
    });
  }

  @MessagePattern({ cmd: 'get-user' })
  async findOne(id: string) {
    console.log(id);
    const user = await this.usersService.findOne(id);

    return new BaseResponse(user);
  }

  @MessagePattern({ cmd: 'update-user' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @MessagePattern({ cmd: 'delete-user' })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
