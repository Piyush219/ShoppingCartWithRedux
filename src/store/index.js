import {configureStore} from '@reduxjs/toolkit';
import CartReducer from './CartReducer';
import ShowCartReducer from './ShowCartReducer';

const store = configureStore({
    reducer: {cart: CartReducer, showCart: ShowCartReducer}
})

export default store;