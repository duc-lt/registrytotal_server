import { CarUse } from '@cars/enums/car-uses.enum';

export type CarsXlsxRow = {
  number: number;
  owner: {
    name: string;
    identityNumber?: string;
    address: string;
    taxId?: string;
  };
  specs: {
    maker: string;
    model: string;
    version: string;
  };
  registrationInfo: {
    certNumber: string;
    createdAt: Date;
    registrationNumber: string;
    registryProvince: string;
  };
  usedFor: CarUse;
  inspectionInfo: {
    certNumber: string;
    createdAt: Date;
    expiresAt: Date;
    serviceProvider: string;
  };
};
