import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { item, quantity } = action.payload;
            const existingItem = state.items.find(cartItem => cartItem.id === item.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({ ...item, quantity });
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateQuantity: (state, action) => {
            const { itemId, quantity } = action.payload;
            const item = state.items.find(item => item.id === itemId);
            if (item && quantity > 0) {
                item.quantity = quantity;
            } else if (item && quantity === 0) {
                state.items = state.items.filter(item => item.id !== itemId);
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;