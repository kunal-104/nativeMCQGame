import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],         // Array to store items added to the cart
  totalAmount: 0,    // Total price of items in the cart
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      state.items.push(newItem);
      state.totalAmount += newItem.price;
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== id);
        state.totalAmount -= existingItem.price;
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions; // Export actions
export default cartSlice.reducer; // Export the reducer
