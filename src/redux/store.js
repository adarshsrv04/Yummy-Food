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
    },
    clearCart: () => {
      return [];  // Resets cart to empty array
    }
  }
});

// add/get order history to/from user's localstorage
const savedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
const orderHistorySlice = createSlice({
  name: "orderHistory",
  initialState: savedOrders,
  reducers: {
    addOrderHistory: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("orderHistory", JSON.stringify(state));
    }
  }
});

// add/get rating on particular order to/from user's localstorage
const savedRatings = JSON.parse(localStorage.getItem("ratings") || "{}");
const ratingsSlice = createSlice({
  name: "ratings",
  initialState: savedRatings,
  reducers: {
    addRating: (state, action) => {
      const { orderId, ratings } = action.payload;
      state[orderId] = ratings;
      // Persist to localStorage
      const plainState = { ...state };
      localStorage.setItem("ratings", JSON.stringify(state));
      console.log("state--", state);
      console.log(localStorage.getItem("ratings"));
    },
  },
});


export const { addItem, removeItem, clearCart } = cartSlice.actions;
export const { addOrderHistory } = orderHistorySlice.actions;
export const { addRating } = ratingsSlice.actions;


export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    orderHistory: orderHistorySlice.reducer,
    ratings: ratingsSlice.reducer,
  },
  devTools: true,
});