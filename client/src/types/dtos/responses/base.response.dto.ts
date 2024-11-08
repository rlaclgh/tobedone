/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface BaseResponseDto<T> {
  code: "SUCCESS" | "FAIL";

  message: string;

  data?: T;
}
