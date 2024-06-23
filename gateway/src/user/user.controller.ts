import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly clientUserService: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.clientUserService.send(
      { cmd: 'create-user' },
      { createUserDto },
    );
  }

  @Get()
  async findAll() {
    return this.clientUserService.send({ cmd: 'get-all-user' }, {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clientUserService.send({ cmd: 'get-user' }, { id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.clientUserService.send(
      { cmd: 'update-user' },
      { id, updateUserDto },
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.clientUserService.send({ cmd: 'delete-user' }, { id });
  }
}
