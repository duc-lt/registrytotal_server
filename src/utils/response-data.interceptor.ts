import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';
import { ResponseData } from './response-data.type';
import { Response } from 'express';

@Injectable()
export class ResponseDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const response = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      map<any, ResponseData>((res) => ({
        success: true,
        statusCode: response.statusCode,
        data: res,
        error: null,
      })),
    );
  }
}
