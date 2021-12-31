import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from 'react-redux';
import { Fragment, useEffect } from 'react';
import Notification from './components/UI/Notification';
import { cartActions, sendCartData } from './store/CartReducer';

let isCheck = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.showCart.showCart)
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.showCart.notification)

  

  useEffect(()=>{
    if(isCheck){
      isCheck = false;
      return;}

      if(cart.changed){
        dispatch(sendCartData(cart))
      }
      
    }
    ,[cart, dispatch])

    useEffect(()=>{
      fetch('https://shopingcart-4eae1-default-rtdb.firebaseio.com/cart.json')
      .then(response=>{
        if(response.ok){
          console.log('data received')
          return response.json()
        }
        else{
          throw new Error("nothing")
        }
      }).then(data=>{
        console.log(data)
        dispatch(cartActions.replace(data))
      }).catch(err=> console.log(err))
    },[dispatch])


  return (
    <Fragment>
   { notification &&  <Notification status = {notification.status} title = {notification.title} message = {notification.message} />}
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
