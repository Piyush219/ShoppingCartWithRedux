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
      console.log("title",action.payload.title)
      const checkItem = state.cartItems.find(item => item.title === action.payload.title)
      if(checkItem){
        console.log("checkinc")
          checkItem.quantity++
          checkItem.total = checkItem.price*checkItem.quantity
      }
      else{
        console.log('checkelse')
        state.cartItems.push(action.payload)
      }
      
    },
    increaseQuantity(state,action){
      const increaseItem = state.cartItems.find(item => item.title === action.payload)
      increaseItem.quantity++
      increaseItem.total = increaseItem.quantity * increaseItem.price
    },
    decreaseQuantity(state,action){
      const decreaseItem = state.cartItems.find(item => item.title === action.payload)
    
        decreaseItem.quantity--
        decreaseItem.total = decreaseItem.quantity * decreaseItem.price
      
      },
      removeCartItem(state,action){
        state.cartItems = state.cartItems.filter(item => item.title!==action.payload)
    }
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
