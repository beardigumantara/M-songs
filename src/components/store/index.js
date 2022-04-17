import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './slice-token';

export default configureStore({
    reducer: {
        token: tokenReducer
    },
}); 