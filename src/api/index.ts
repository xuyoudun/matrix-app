export interface APIResponse<T> {
  status: 'SUCCESS' | 'WARNING' | 'ERROR' | 'INFO';
  code: string;
  message: string;
  response: T;
}

