//this store is global

import {configureStore, combineReducers} from "@reduxjs/toolkit"
import cartReducer from "./cartRedux"
import userReducer from "./userRedux"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
  
  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
const rootReducer = combineReducers({user: userReducer, cart: cartReducer})


//we include which reducer we want to persist, which is our userReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)
  
//note to self i had an error here 
// i had it as "export const store = () => configureStore"
//it seems i had declared my store to be a function that returns a configured store 
//and i pass a reference to this store function persistStore
//I should just export and consume an already configured store object.
export const store = configureStore({

    reducer: persistedReducer ,
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),


})


export let persistor = persistStore(store)