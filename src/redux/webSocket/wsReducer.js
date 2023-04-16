import {
    WS_CONNECT,
    WS_DISCONNECT
} from './wsTypes';

const initialState = {
    ws: {}
}
const wsReducer = (state = initialState, action) => {
    switch (action.type){
        case WS_CONNECT: return {
            ws: new WebSocket('ws://localhost:5001')
        }

        case WS_DISCONNECT: return {
            ws: {}
        }

        default: return state;
    }
}

export default wsReducer;