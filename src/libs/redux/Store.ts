import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import userReducer from './reducers/user.reducer';
import infoReducer from './reducers/information.reducer';
import actualiteReducer from './reducers/actualite.reducer';
import notifReducer from './reducers/notification.reducer';

const reducers = combineReducers({ user: userReducer, info: infoReducer, actu: actualiteReducer, notif: notifReducer })
const Store = legacy_createStore(reducers, applyMiddleware(thunk))

export type RootState = ReturnType<typeof reducers>;


export default Store