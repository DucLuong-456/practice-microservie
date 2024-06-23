import { Controller, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  @MessagePattern({ cmd: 'create-user' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Get()
  @MessagePattern({ cmd: 'get-all-user' })
  async findAll(data: any) {
    return this.usersService.findAll();
  }

  // @Get(':id')
  @MessagePattern({ cmd: 'get-user' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // @Patch(':id')
  @MessagePattern({ cmd: 'update-user' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // @Delete(':id')
  @MessagePattern({ cmd: 'delete-user' })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
