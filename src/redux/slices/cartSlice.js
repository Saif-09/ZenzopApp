import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_STORAGE_KEY = 'cartItems';

// Load cart items from AsyncStorage
const loadCartFromStorage = async () => {
    try {
        const storedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        console.error('Error loading cart from storage:', error);
        return [];
    }
};

// Save cart items to AsyncStorage
const saveCartToStorage = async (items) => {
    try {
        await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
        console.error('Error saving cart to storage:', error);
    }
};

// Initialize state with items from storage
const initializeState = async () => {
    const items = await loadCartFromStorage();
    return { items };
};

// Initial state (synchronous fallback)
const initialState = {
    items: [],
};

// Create the cart slice
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
            saveCartToStorage(state.items); // Save to AsyncStorage
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            saveCartToStorage(state.items); // Save to AsyncStorage
        },
        updateQuantity: (state, action) => {
            const { itemId, quantity } = action.payload;
            const item = state.items.find(item => item.id === itemId);
            if (item && quantity > 0) {
                item.quantity = quantity;
            } else if (item && quantity === 0) {
                state.items = state.items.filter(item => item.id !== itemId);
            }
            saveCartToStorage(state.items); // Save to AsyncStorage
        },
        clearCart: (state) => {
            state.items = [];
            saveCartToStorage(state.items); // Save to AsyncStorage
        },
        loadCart: (state, action) => {
            state.items = action.payload;
        },
    },
});

// Export actions
export const { addToCart, removeFromCart, updateQuantity, clearCart, loadCart } = cartSlice.actions;

// Thunk to initialize cart from storage
export const initializeCart = () => async (dispatch) => {
    const { items } = await initializeState();
    dispatch(loadCart(items));
};

export default cartSlice.reducer;