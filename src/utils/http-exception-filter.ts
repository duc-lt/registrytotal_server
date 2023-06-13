import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseData } from './response-data.type';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const response = ctx.getResponse<Response>();
    const responseData: ResponseData = {
      success: false,
      statusCode: status,
      error: {
        detail: exception.getResponse(),
        timestamp: new Date().toISOString(),
        url: request.url,
      },
    };

    return response.json(responseData);
  }
}
