export interface IResponseData<T> {
  httpStatusCode: number;
  success: boolean;
  message: string;
  errorSources?: Array<{ message?: string }>;
  data?: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
