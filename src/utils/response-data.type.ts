type SuccessStatus = boolean;
type Payload = Record<string, unknown> | Record<string, unknown>[];
type ErrorDetail = {
  detail: object | string;
  timestamp: string;
  url: string;
};

export type ResponseData = {
  success: SuccessStatus;
  payload?: Payload;
  error?: ErrorDetail;
};
