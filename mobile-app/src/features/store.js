import {configureStore, combineReducers} from '@reduxjs/toolkit';

import {persistReducer, persistStore} from 'redux-persist';
// import {encryptTransform} from 'redux-persist-transform-encrypt';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './auth/authSlice';

const rootPersistConfig = {
  key: 'bolnet',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['auth'],
  // transforms: [
  //   encryptTransform({
  //     secretKey: 'truesecretkeyforpersiststore',
  //     onError: error => console.log('error', error),
  //   }),
  // ],
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
