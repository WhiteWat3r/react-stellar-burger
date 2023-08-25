import { Reducer } from 'react';
import { AnyAction } from 'redux';

import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_FEED,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_GET_FEED,
} from '../actions/web-socket';
import { TFeed } from '../types';

type TWSState = {
  wsConnected: boolean;
  wsUserConnected: boolean;



  feedUser: TFeed | {};


  feed: TFeed | {};

  error?: Event;
  errorUser?: Event;
};

const initialState: TWSState = {
  wsConnected: false,
  wsUserConnected: false,
  feedUser: {},
  feed: {},
};

export const wsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };



    case WS_USER_CONNECTION_SUCCESS:
      return {
        ...state,
        errorUser: undefined,
        wsUserConnected: true,
      }





    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };


      case WS_USER_CONNECTION_ERROR:
        return {
          ...state,
          errorUser: action.payload,
          wsUserConnected: false,
        };
  



    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };



      case WS_USER_CONNECTION_CLOSED:
        return {
          ...state,
          errorUser: undefined,
          wsUserConnected: false,
        };




    case WS_GET_FEED:
      return {
        ...state,
        error: undefined,
        feed: action.payload,
      };

      
    case WS_USER_GET_FEED:
      return {
        ...state,
        errorUser: undefined,
        feedUser: action.payload,
      };
    default:
      return state;
  }
};

// export const wsReducer = function (state = initialState, action: AnyAction):TWSState  {
//   switch (action.type) {
//     case WS_CONNECTION_SUCCESS:
//       return {
//         ...state,
//         error: undefined,
//         wsConnected: true,
//       };

//     case WS_CONNECTION_ERROR:
//       return {
//         ...state,
//         error: action.payload,
//         wsConnected: false,
//       };
//     case WS_CONNECTION_CLOSED:
//       return {
//         ...state,
//         error: undefined,
//         wsConnected: false,
//       };
//     case WS_GET_FEED:
//       return {
//         ...state,
//         error: undefined,
//         feed: action.payload,
//       };
//     default:
//       return state;
//   }
// };
