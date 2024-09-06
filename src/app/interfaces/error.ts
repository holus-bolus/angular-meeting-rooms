import { ERROR_CODES } from '@constants/errors';

export interface IRequestError {
  code: ERROR_CODES;
  message: string;
  errors: IMatrixError[];
}

export interface IMatrixError {
  field: string;
  message: string;
}

export interface IErrorDetails {
  code: number;
  message: string;
}
