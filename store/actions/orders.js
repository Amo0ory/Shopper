import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrder = ()=>{
  
  return async (dispatch, getState) =>{
    try{
      const userId = getState().auth.userId;

      const response = await fetch(`https://shopper-981db.firebaseio.com/orders/${userId}.json`)
      if(!response.ok){
       throw new Error('Something went wrong!') 
      }

      const resData = await response.json();
      const loadedOrders = []

      for(const key in resData){
        loadedOrders.push( new Order(
          key,
          resData[key].cartItems,
          resData[key].totalAmount,
          new Date(resData[key].date)
        ))
      }
      dispatch({
        type:SET_ORDERS,
        orderData:loadedOrders
      })

    }catch(e){
      throw e;
    }
    
  }
}
export const addOrder = (cartItems, totalAmount) => {
  
  const date = new Date()
  return async (dispatch, getState) =>{

    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(`https://shopper-981db.firebaseio.com/orders/${userId}.json?auth=${token}`,{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toISOString()
      })

    });
    const resData = response.json();
    if(!response.ok){
      throw new Error('something went worng')
    }
    dispatch({
      type:ADD_ORDER,
      orderData:{
        id: resData.name,
        items: cartItems,
        amount: totalAmount
      }
    })
  }
  return {
    type: ADD_ORDER,
    orderData: { items: cartItems, amount: totalAmount, date: date }
  };
};

