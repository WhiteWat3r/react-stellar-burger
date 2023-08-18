import { getCookie } from './cookie';
import { checkResponse } from './checkResponse';
import { config } from './constants';

export function request(url: string, options?: RequestInit | undefined) {
  return fetch(config.baseUrl + url, options).then(checkResponse);
}

export const authRequest = async (url: string, method = 'GET', data = {}) => {
  try {
    const accessToken = getCookie('accessToken');
    // console.log(accessToken);
    const options: RequestInit = {
      method,
      headers: {
        ...config.headers,
        authorization: `Bearer ${accessToken}`,
      },
    };
    if (method !== 'GET' && data) {
      options.body = JSON.stringify(data);
    }

    const response = await request(url, options);
    // console.log('response', response);

    return response;
  } catch (error) {

    throw error;
  }
};
