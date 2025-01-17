import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3001,
          host: '127.0.0.1',
        },
      },
    ]),
  ],
  controllers: [UserController],
})
export class UserModule {}
