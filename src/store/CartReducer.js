import { createSlice } from "@reduxjs/toolkit";
import { showCartActions } from "./ShowCartReducer";

const initialCartState = {
  cartItems: [{ title: "Test Item", price: 6, quantity: 3, total: 18 }],
  quantity: 1,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    
    cartItems(state, action) {
      console.log(action.payload);
      console.log("title",action.payload.title)
      const checkItem = state.cartItems.find(item => item.title === action.payload.title)
      if(checkItem){
        console.log("checkinc")
          checkItem.quantity++
          checkItem.total = checkItem.price*checkItem.quantity
          state.changed=true
      }
      else{
        console.log('checkelse')
        state.cartItems.push(action.payload)
        state.changed=true
      }
      
    },
    replace(state,action){
      state.cartItems = action.payload.cartItems;
      state.quantity = action.payload.quantity;
    },
    increaseQuantity(state,action){
      const increaseItem = state.cartItems.find(item => item.title === action.payload)
      increaseItem.quantity++
      increaseItem.total = increaseItem.quantity * increaseItem.price
      state.changed=true
    },
    decreaseQuantity(state,action){
      const decreaseItem = state.cartItems.find(item => item.title === action.payload)
    
        decreaseItem.quantity--
        decreaseItem.total = decreaseItem.quantity * decreaseItem.price
        state.changed=true
      
      },
      removeCartItem(state,action){
        state.cartItems = state.cartItems.filter(item => item.title!==action.payload)
        state.changed=true
    }
  },
});


export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
    showCartActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending cart data!',
    })
    )

    const sendRequest = async() => {
      const response = await fetch('https://shopingcart-4eae1-default-rtdb.firebaseio.com/cart.json',{
        method: 'PUT',
          body: JSON.stringify({
            cartItems: cart.cartItems,
            quantity: cart.quantity
          }),

      })
      if(!response.ok){
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      await sendRequest();

      dispatch(
        showCartActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    } catch (error) {
      dispatch(
        showCartActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }


  }
}





export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
