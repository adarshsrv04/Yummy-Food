import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
      addItem: (state, action) => {
        const existingItem = state.find(item => item.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.push({ ...action.payload, quantity: 1 });
        }
        console.log("Item Added:", action.payload);
      },
      removeItem: (state, action) => {
        const existingItem = state.find(item => item.id === action.payload);
        if (existingItem) {
            console.log("Item Removed:", existingItem);
          if (existingItem.quantity > 1) {
            existingItem.quantity -= 1;
          } else {
            console.log("Item Removed:", action.payload);
            return state.filter(item => item.id !== action.payload);
          }
        }
      }
    }
  });

export const { addItem, removeItem } = cartSlice.actions;

export const store = configureStore({
  reducer: { cart: cartSlice.reducer },
  devTools: true,
});

// export default store;
