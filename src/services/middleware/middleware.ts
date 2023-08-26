import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../reducers';
import { getCookie } from '../../utils/cookie';

export const socketMiddleware = (wsUrl: string, wsActions: any): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      // console.log(action);
      
      // const accessToken = getCookie('accessToken');

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      };


      
      if (type === onClose) {
        socket && socket.close(1000, 'CLOSE_NORMAL');
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose });
        };
      }

      next(action);
    };
  }) as Middleware;
};
