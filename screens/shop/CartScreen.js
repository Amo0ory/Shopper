import React from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Color from '../../constants/Color';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';
import Card from '../../components/UI/Card';

const CartScreen = props=>{

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItem = useSelector(state => 
            {
                const transformedCartItems =[];
                for(const key in state.cart.items){
                    transformedCartItems.push({
                        productId: key,
                        productTitle: state.cart.items[key].productTitle,
                        productPrice: state.cart.items[key].productPrice,
                        quantity: state.cart.items[key].quantity,
                        sum: state.cart.items[key].sum
                    })
                }
                return transformedCartItems.sort((a,b) => a.productId > b.productId? 1: -1)
            });
    const dispatch = useDispatch();
    return (
        <View style = {styles.screen}>
            <Card style = {styles.summary}>
                <Text style ={styles.summaryText}>
                    Total:{' '} 
                    <Text style = {styles.amount}>${cartTotalAmount}</Text>
                </Text>
                <Button 
                    color={Color.accent} 
                    title = 'Order Now' 
                    disabled={cartItem.length === 0}
                    onPress={()=>{dispatch(orderActions.addOrder(cartItem, cartTotalAmount))}}
                    />
            </Card>
            <FlatList 
                data={cartItem} 
                keyExtractor={item => item.productId} 
                renderItem={itemData =>
                    <CartItem 
                        quantity={itemData.item.quantity}
                        title ={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deletable
                        onRemove={() =>{dispatch(cartActions.removeFromCart(itemData.item.productId))}}
  
                    />
                }
            />  
        </View>
    );
};

CartScreen.navigationOtions ={
    headerTitle:'Your cart'
}
const styles = StyleSheet.create({
    screen:{
        margin:20,

    },
    summary:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:20,
        padding: 10,
       
    },
    summaryText:{
        fontFamily:'open-sans-bold',
        fontSize:18
    },
    amount:{
        color: Color.primary
    }

});

export default CartScreen;