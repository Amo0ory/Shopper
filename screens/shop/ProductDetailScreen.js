import React from 'react';
import {View, Text, StyleSheet,ScrollView, Button, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Color from '../../constants/Color';
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = props=>{
    const dispatch = useDispatch();
    const product = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => 
        state.products.availableProducts.find(prod => prod.id === product));

      
    return (
        <ScrollView>
            <Image style={styles.image} source= {{uri: selectedProduct.imageUrl}}/>
            <View style ={styles.actions}>
            <Button color={Color.primary} title='Add To Cart' onPress={() =>{dispatch(cartActions.addToCart(selectedProduct))}}/>            
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>

    );
}

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    };
}

const styles = StyleSheet.create({
    image:{
        width:'100%',
        height:300
    },
    price:{
        fontFamily:'open-sans',
        fontSize:20,
        color:'#888',
        textAlign:'center',
        marginVertical:20
    },
    description:{
        fontFamily:'open-sans',
        fontSize:14,
        textAlign:'center'
    },
    actions:{
        marginVertical:10,
        alignItems:'center',
        marginHorizontal:20
    }

})

export default ProductDetailScreen;