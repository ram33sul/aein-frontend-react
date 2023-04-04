import { legacy_createStore } from 'redux';

import userReducer from './user/userReducer';

const store = legacy_createStore(userReducer);

export default store;