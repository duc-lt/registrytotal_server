import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ResponseData } from './response-data.type';

@Injectable()
export class ResponseDataInterceptor implements NestInterceptor<ResponseData> {
  intercept(
    _: ExecutionContext,
    next: CallHandler<ResponseData>,
  ): Observable<ResponseData> | Promise<Observable<ResponseData>> {
    return next.handle().pipe(
      map((response) => ({
        success: true,
        payload: response,
      })),
    );
  }
}
