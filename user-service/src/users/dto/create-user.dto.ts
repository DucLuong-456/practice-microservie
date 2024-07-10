import { IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  user_name: string;
  @IsString()
  password: string;
  @IsString()
  email: string;
  @IsString()
  phone_number: string;
}
