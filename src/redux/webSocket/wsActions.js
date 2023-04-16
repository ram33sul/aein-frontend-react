import {
    WS_CONNECT,
    WS_DISCONNECT
} from './wsTypes';

export const wsConnect = (userId) => {
    return {
        type: WS_CONNECT,
        payload: {
            userId
        }
    }
}

export const wsDisconnect = (ws) => {
    return {
        type: WS_DISCONNECT
    }
}