import { createSlice } from '@reduxjs/toolkit';

const loadWishlistFromStorage = () => {
  try {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch (error) {
    console.error('Error loading wishlist:', error);
    return [];
  }
};

const saveWishlistToStorage = (wishlist) => {
  try {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  } catch (error) {
    console.error('Error saving wishlist:', error);
  }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlistItems: loadWishlistFromStorage()
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
      const exists = state.wishlistItems.find(item => item.id === serializedItem.id);
      if (!exists) {
        state.wishlistItems.push(serializedItem);
        saveWishlistToStorage(state.wishlistItems);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload);
      saveWishlistToStorage(state.wishlistItems);
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
      saveWishlistToStorage([]);
    }
  }
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;