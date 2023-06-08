import { HttpException, HttpStatus } from '@nestjs/common';
import { StatusCodes } from 'src/base-interface';

export class UserError<Status> extends HttpException {
  constructor(status: Status | StatusCodes, message?: any, code?: HttpStatus) {
    super({ status, message }, code || HttpStatus.BAD_REQUEST);
    console.log('status', status);
    if (message) {
      console.log('message_err', message);
    }
  }
}
