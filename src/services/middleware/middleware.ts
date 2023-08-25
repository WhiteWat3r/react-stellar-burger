import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../reducers';
import { getCookie } from '../../utils/cookie';

export const socketMiddleware = (wsUrl: string, wsActions: any): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      const accessToken = getCookie('accessToken');

      if (type === wsInit && accessToken) {
        socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
      }
      if (type === onClose) {
        socket && socket.close(1000, 'CLOSE_NORMAL');
      }
      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = () => {
          dispatch({ type: onError });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
        };
      }

      next(action);
    };
  }) as Middleware;
};
