export interface BaseResponse<T> {
  status: number;
  data: T;
}

export const parseResponse = (data: any) => ({ data });

export const parseError = (error: string, status: number) => ({
  statusCode: status,
  message: error,
});
