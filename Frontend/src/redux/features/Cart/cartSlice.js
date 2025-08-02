import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../../../Utils/cart';

const initialState = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')) : {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: 'PayPal',
};

// Example of the payload structure for addToCart action
// {
//   _id: "1",
//   name: "Product A",
//   price: 100,
//   qty: 2,
//   user: { ... },
//   rating: 4.5,
//   numReviews: 10,
//   reviews: [ ... ]
// }

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers: { 
        addToCart: (state, action) => {
            const {user,rating,numReviews,reviews,...newItem}= action.payload;            
            const existItem= state.cartItems.find(item => item._id === newItem._id);  // Check if the item already exists in the cart
            if(existItem) {
                state.cartItems = state.cartItems.map(item =>                       // If the item exists, update its quantity 
                    item._id === existItem._id ? newItem : item
                );
            }else{
                state.cartItems= [...state.cartItems, newItem];  // Add the new item to the cart
            }
            return updateCart(state,newItem);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            return updateCart(state);
        },

        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem("cart", JSON.stringify(state));
        },

        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem("cart", JSON.stringify(state));
        },

        clearCartItems: (state) => {
            state.cartItems = [];
            localStorage.setItem("cart", JSON.stringify(state));
        },

        resetCart: (state) => (state = initialState),
    }
});

export const {
  addToCart,
  removeFromCart,
  savePaymentMethod,
  saveShippingAddress,
  clearCartItems,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;

