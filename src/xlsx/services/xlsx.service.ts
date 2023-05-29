import { Injectable } from '@nestjs/common';
import readXlsxFile from 'read-excel-file/node';
import { carsXlsxSchema } from '../schemas/cars-xlsx.schema';
import { CarsXlsxRow } from '../types/cars-xlsx-row.type';

@Injectable()
export class XlsxService {
  async read(path: string) {
    const { rows } = await readXlsxFile<CarsXlsxRow>(path, {
      schema: carsXlsxSchema,
    });

    return rows;
  }
}
