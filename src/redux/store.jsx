import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice'; 
import wishlistReducer from './wishlistReducer';


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist:wishlistReducer,
  },
});
