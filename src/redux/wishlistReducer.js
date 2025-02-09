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
      // First, check if the item exists
      const exists = state.wishlistItems.some(item => item.id === action.payload.id);
      
      if (!exists) {
        // Create a safe copy of the item, handling the time field properly
        const safeItem = {
          ...action.payload,
          // Only include time if it exists and has the expected properties
          ...(action.payload.time && {
            time: {
              seconds: action.payload.time?.seconds || 0,
              nanoseconds: action.payload.time?.nanoseconds || 0
            }
          })
        };
        
        // Remove undefined or null properties
        Object.keys(safeItem).forEach(key => {
          if (safeItem[key] === undefined || safeItem[key] === null) {
            delete safeItem[key];
          }
        });

        state.wishlistItems.push(safeItem);
        saveWishlistToStorage(state.wishlistItems);
        
        // Log successful addition
        console.log('Added to wishlist:', safeItem);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload);
      saveWishlistToStorage(state.wishlistItems);
      
      // Log successful removal
      console.log('Removed from wishlist:', action.payload);
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
      saveWishlistToStorage([]);
      
      // Log wishlist clearing
      console.log('Wishlist cleared');
    }
  }
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;