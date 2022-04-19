import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './slice-token';

const store = configureStore({
    reducer: {
        token: tokenReducer
    },
}); 

export default store;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch; 