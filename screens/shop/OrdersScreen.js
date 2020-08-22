import React, {useEffect, useState} from 'react';
import { FlatList, Text, Platform , ActivityIndicator, View} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as ordersActions from '../../store/actions/orders';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import Colors from '../../constants/Colors';

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    setIsLoading(true);

     dispatch(ordersActions.fetchOrder()).then(()=>{
      setIsLoading(false)

     })
  }, [dispatch]);

if(isLoading){

  return (<View style ={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size='small' color={Colors.primary}/>
    </View>)
}

if(orders.length === 0){

  return <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
    <Text>No order is available, you may need to add more orders?</Text>
  </View>
}
  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

export default OrdersScreen;
