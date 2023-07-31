import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import userReducer from './reducers/user.reducer';
import infoReducer from './reducers/information.reducer';
import actualiteReducer from './reducers/actualite.reducer';
import notifReducer from './reducers/notification.reducer';
import villeReducer from './reducers/ville.reducer';
import devisReducer from './reducers/devis.reducer';
import factureReducer from './reducers/facture.reducer';
import isagoReducer from './reducers/isago.reducer';
import compteurReducer from './reducers/compteur.reducer';
import assistanceReducer from './reducers/assistance.reducer';
import quartierReducer from './reducers/quartier.reducer';

const reducers = combineReducers({
    user: userReducer,
    info: infoReducer, actu: actualiteReducer,
    notif: notifReducer, ville: villeReducer,
    devis: devisReducer, facture: factureReducer,
    isago: isagoReducer, compteur: compteurReducer,
    assistance: assistanceReducer,
    quartier: quartierReducer
})
const Store = legacy_createStore(reducers, applyMiddleware(thunk))

export type RootState = ReturnType<typeof reducers>;


export default Store