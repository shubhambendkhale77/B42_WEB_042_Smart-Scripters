import { createSlice } from '@reduxjs/toolkit';

const getCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : []; // Ensure it's always an array
};

const initialState = getCartFromLocalStorage();

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
    deleteFromCart(state, action) {
      return state.filter(item => item.id !== action.payload.id);
    },
    incrementQuantity: (state, action) => {
      return state.map(item => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 }; // Ensure state mutation is avoided
        }
        return item;
      });
    },
    decrementQuantity: (state, action) => {
      return state.map(item => {
        if (item.id === action.payload && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    },
  },
});

// Export actions correctly
export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity } = CartSlice.actions;

export default CartSlice.reducer; 
