import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from './slice/wishlistReducer';

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
  },
});

export default store;
