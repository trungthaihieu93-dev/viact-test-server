import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BaseResponse } from '../responses/base';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, BaseResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<BaseResponse<T>> {
    return next
      .handle()
      .pipe(map((data) => ({ status: data.statusCode, data })));
    // .pipe(
    //   map((data) => {
    //     console.log(data);
    //     return { status: data.statusCode, data };
    //   }),
    // )
  }
}
