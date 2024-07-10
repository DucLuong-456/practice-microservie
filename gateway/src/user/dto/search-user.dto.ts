// import { IsNumber } from 'class-validator';
export class SearchUserDto {
  // @IsNumber()
  limit: number = 5;
  // @IsNumber()
  page: number = 1;
}
