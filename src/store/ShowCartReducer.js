import { createSlice } from "@reduxjs/toolkit";

const initialShowState = {showCart:false, notification: null}

const showCartItemSlice = createSlice({
    name: 'showCart',
    initialState:initialShowState,
    reducers:{
        showCart(state) {
            state.showCart = !state.showCart;
          },
          showNotification(state,action){
              console.log('acpay',action.payload)
              state.notification = {
                  status:action.payload.status,
                  title: action.payload.title,
                  message: action.payload.message
              }
          }
    }
    
})

export const showCartActions = showCartItemSlice.actions;

export default showCartItemSlice.reducer