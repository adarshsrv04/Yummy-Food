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
        },
        removeItem: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        }
    }
});

const store = configureStore({ reducer: { cart: cartSlice.reducer } });
export default cartSlice