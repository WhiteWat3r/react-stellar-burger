import { checkResponse } from './checkResponse';
import { config } from './constants';

export function request(url, options) {
  return fetch(config.baseUrl + url, options).then(checkResponse);
}
