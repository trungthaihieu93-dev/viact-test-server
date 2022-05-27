export interface BaseResponse<T> {
  status: number;
  data: T;
}

export const parseResponse = (data: any) => ({ data });
