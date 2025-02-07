import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlistItems: []
  },
  reducers: {
    addToWishlist: (state, action) => {
      const serializedItem = {
        ...action.payload,
        time: {
          seconds: action.payload.time.seconds,
          nanoseconds: action.payload.time.nanoseconds
        }
      };
      state.wishlistItems.push(serializedItem);
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload);
    }
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
