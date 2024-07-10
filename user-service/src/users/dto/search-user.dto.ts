import { IsNumber } from 'class-validator';
export class SearchUserDto {
  @IsNumber()
  limit: number;
  @IsNumber()
  page: number;
}
