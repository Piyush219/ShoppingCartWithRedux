import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from 'react-redux';
import { Fragment, useEffect } from 'react';
import { showCartActions } from './store/ShowCartReducer';
import Notification from './components/UI/Notification';

let isCheck = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.showCart.showCart)
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.showCart.notification)

  

  useEffect(()=>{
    if(isCheck){
      isCheck = false;
      return;
    }
    dispatch(showCartActions.showNotification({
      status: 'pending',
      title: 'sending...',
      message: 'Sending Data'
    }))
    fetch('https://shopingcart-4eae1-default-rtdb.firebaseio.com/cart.json',{
      method: 'PUT',
      body:JSON.stringify(cart)
    }).then((response)=>{
      if(response.ok){
        console.log("Sent")
        dispatch(showCartActions.showNotification({
          status: 'success',
          title: 'sent',
          message: 'Data sent'
        }))
        return response.json()
      }
      else{
        
        return response.json(data=>{
          throw new Error("Something Went wrong")
        })
        
      }
    }).catch(err => 
      
      dispatch(showCartActions.showNotification({
        status: 'error',
        title: 'Error',
        message: 'sending failed'
      }))
    )
    
      
  },[cart, dispatch])


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
