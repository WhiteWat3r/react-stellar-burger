import { getCookie } from './cookie';
import { checkResponse } from './checkResponse';
import { config } from './constants';

export function request(url, options) {
  return fetch(config.baseUrl + url, options).then(checkResponse);
}


export const authRequest = async (url, method = 'GET', data = null) => {
  try {
    const accessToken = getCookie('accessToken')
    // console.log(accessToken);
    const options = {
      method,
      headers: {
        ...config.headers,
        'authorization': `Bearer ${accessToken}`, 
      }
    }
    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await request(url, options);
    return response;
  } catch (error) {
    throw error;
  }
};