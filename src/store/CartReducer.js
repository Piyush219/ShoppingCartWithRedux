import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  showCart: false,
  cartItems: [{ title: "Test Item", price: 6, quantity: 3, total: 18 }],
  quantity: 1,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    showCart(state) {
      state.showCart = !state.showCart;
    },
    cartItems(state, action) {
      console.log(action.payload);
      state.cartItems = [...state.cartItems, action.payload];
    },
    increaseQuantity(state){
        state.quantity++
    },
    decreaseQuantity(state){
        state.quantity--
    }
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
