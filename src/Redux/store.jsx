///////store.jsx
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'color',
    storage: storage,
    //whitelist: ['authType'] // which reducer want to store
};
const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
    pReducer,
    applyMiddleware(thunk)
);
const persistor = persistStore(store);
export { persistor, store };

