type SuccessStatus = boolean;
type Payload = Record<string, any> | Record<string, any>[] | null;
type ErrorDetail = {
  detail: object | string;
  timestamp: string;
  url: string;
} | null;

export type ResponseData = {
  success: SuccessStatus;
  statusCode: number;
  payload?: Payload;
  error: ErrorDetail;
};
