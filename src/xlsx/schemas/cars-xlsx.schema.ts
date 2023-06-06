import { CarUse } from '@cars/enums/car-uses.enum';
import { Schema as XlsxSchema } from 'read-excel-file';

export const carsXlsxSchema: XlsxSchema = {
  STT: {
    prop: 'number',
    type: Number,
  },
  'Chủ sở hữu': {
    prop: 'owner',
    type: {
      Tên: {
        prop: 'name',
        type: String,
      },
      CCCD: {
        prop: 'identityNumber',
        type: String,
        required: false,
      },
      'Địa chỉ': {
        prop: 'address',
        type: {
          'Địa chỉ': {
            prop: 'streetAddress',
            type: String,
          },
          'Mã tỉnh/thành': {
            prop: 'provinceCode',
            type: Number,
          },
          'Mã quận/huyện': {
            prop: 'districtCode',
            type: Number,
          },
          'Mã xã/phường': {
            prop: 'communeCode',
            type: Number,
          },
        },
      },
      'Mã số thuế': {
        prop: 'taxId',
        type: String,
        required: false,
      },
    },
  },
  'Thông số xe': {
    prop: 'specs',
    type: {
      'Hãng xe': {
        prop: 'maker',
        type: String,
      },
      'Mẫu xe': {
        prop: 'model',
        type: String,
      },
      'Phiên bản': {
        prop: 'version',
        type: String,
      },
    },
  },
  'Thông tin đăng ký xe': {
    prop: 'registrationInfo',
    type: {
      'Mã số đăng ký xe': {
        prop: 'certNumber',
        type: String,
      },
      'Ngày cấp': {
        prop: 'createdAt',
        type: Date,
      },
      'Biển số': {
        prop: 'registrationNumber',
        type: String,
      },
      'Mã tỉnh/thành đăng ký xe': {
        prop: 'registryProvinceCode',
        type: Number,
      },
    },
  },
  'Mục đích sử dụng': {
    prop: 'usedFor',
    type: String,
    oneOf: Object.values(CarUse),
  },
  // 'Thông tin đăng kiểm xe': {
  //   prop: 'inspectionInfo',
  //   type: {
  //     'Mã số đăng kiểm xe': {
  //       prop: 'certNumber',
  //       type: String,
  //     },
  //     'Ngày cấp': {
  //       prop: 'createdAt',
  //       type: Date,
  //     },
  //     'Ngày hết hạn': {
  //       prop: 'expiresAt',
  //       type: Date,
  //     },
  //     'Mã trung tâm đăng kiểm': {
  //       prop: 'serviceProvider',
  //       type: String,
  //     },
  //   },
  // },
};
