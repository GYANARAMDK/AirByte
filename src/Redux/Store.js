import {configureStore} from '@reduxjs/toolkit'

import rootreducer from './Reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
   key: 'root',
   storage, // using localStorage for persistence
 };

 const persistedReducer = persistReducer(persistConfig, rootreducer);

const Store= configureStore({
   reducer: persistedReducer,

});

const persistor = persistStore(Store);
export  {Store, persistor};