export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS'; 
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_FEED: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';


export const WS_USER_CONNECTION_START: 'WS_USER_CONNECTION_START' = 'WS_USER_CONNECTION_START';
export const WS_USER_CONNECTION_SUCCESS: 'WS_USER_CONNECTION_SUCCESS' = 'WS_USER_CONNECTION_SUCCESS'; 
export const WS_USER_CONNECTION_ERROR: 'WS__USER_CONNECTION_ERROR' = 'WS__USER_CONNECTION_ERROR';
export const WS_USER_CONNECTION_CLOSED: 'WS_USER_CONNECTION_CLOSED' = 'WS_USER_CONNECTION_CLOSED';
export const WS_USER_GET_FEED: 'WS__USER_GET_FEED' = 'WS__USER_GET_FEED';



export const wsConnectionStart = () => {
    return {
        type: WS_CONNECTION_START
    }
}

export const wsConnectionClosed = () => {
    return {
        type: WS_CONNECTION_CLOSED
    }
}


export const wsUserConnectionStart = () => {
    return {
        type: WS_USER_CONNECTION_START
    }
}

export const wsUserConnectionClosed = () => {
    return {
        type: WS_USER_CONNECTION_CLOSED
    }
}
