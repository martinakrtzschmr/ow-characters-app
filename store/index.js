import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { AsyncStorage } from 'react-native';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer, {},
  compose(
    applyMiddleware(thunk)
  )
);
const persistor = persistStore(store);

export {store, persistor};