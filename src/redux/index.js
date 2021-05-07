import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import getRootReducer from './reducers/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['User', 'App'],
};

const persistedReducer = () => persistReducer(persistConfig, getRootReducer());

export default function getStore() {
  const store = createStore(
    persistedReducer(),
    undefined,
    composeWithDevTools(applyMiddleware(thunk)),
  );

  let persistor = persistStore(store);

  return {store, persistor};
}
