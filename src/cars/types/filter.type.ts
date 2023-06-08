import { FilterAreaUnit, FilterTimeUnit } from '../enums/filters.enum';

type FilterProviderData = {
  providerCode: string;
};

type FilterAreaData = {
  provinceCode: number;
  districtCode?: number;
  communeCode?: number;
};

type FilterData = {
  provider?: FilterProviderData;
  area?: FilterAreaData;
};

type FilterTime = {
  year: { year: number };
  month: { year: number; month: number };
  quarter: { year: number; quarter: number };
};

export { FilterData, FilterTime };
