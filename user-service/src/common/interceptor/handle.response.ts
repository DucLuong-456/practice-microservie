import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagingResponse } from '../types/pagingResponse.type';
import { BaseResponse } from '../types/baseResponse.type';

export interface Response<T> {
  data: T;
}

@Injectable()
export class handleResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof PagingResponse) {
          const paging = {
            page: data.page,
            total_item: data.count,
            limit: data.limit,
          };
          return {
            code: 1,
            status: HttpStatus.OK,
            message: 'Thành công!',
            data: data.data,
            paging: paging,
          };
        } else if (data instanceof BaseResponse)
          return {
            code: 1,
            status: HttpStatus.OK,
            message: 'Thành công!',
            data: data.data,
          };
      }),
    );
  }
}
