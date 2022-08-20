export interface OAuth {
  access_token?: string;
  token_type?: string;
  refresh_token?: string;
  expires_in?: number;
  scope?: string;
}

export interface AuthenticationRequest<P, T> {
  (requestData: P): Promise<T>;
}

export const authentication: AuthenticationRequest<string, OAuth> = (data) => {
  data;
  // 后续切换成请求认证API即可
  const result: OAuth = {
    'access_token': 'c830475f-4f6f-4587-810f-e480d9c749a8',
    'token_type': 'bearer',
    'refresh_token': '84e2e42f-19ac-408c-82b2-b6e48ca1ddae',
    'expires_in': 7200,
    'scope': 'read write trust'
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result);
    }, 300);
  });
};
