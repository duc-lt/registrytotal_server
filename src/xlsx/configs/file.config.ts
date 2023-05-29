import { UnprocessableEntityException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { randomBytes } from 'crypto';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const fileConfig: MulterOptions = {
  storage: diskStorage({
    destination(_, __, callback) {
      const tmpdir = 'public/tmp';
      if (!existsSync(tmpdir)) {
        mkdirSync(tmpdir, { recursive: true });
      }

      callback(null, tmpdir);
    },
    filename(_, file, callback) {
      const extension = extname(file.originalname);
      const filename = `${randomBytes(32).toString('hex')}${extension}`;
      callback(null, filename);
    },
  }),
  fileFilter(_, file, callback) {
    const extension = extname(file.originalname);
    if (!extension.match(/\.(xls|xlsx|ods)$/)) {
      return callback(
        new UnprocessableEntityException('File không hợp lệ!'),
        false,
      );
    }

    return callback(undefined, true);
  },
};
