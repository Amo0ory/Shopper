import React from 'react';
import {
    Text, 
    View, 
    StyleSheet, 
    Image, 
    Button, 
    TouchableOpacity,
    TouchableNativeFeedback

} from 'react-native';
import Color from '../../constants/Color';
import { Platform } from '@unimodules/core';
import Card from '../UI/Card';
const ProductItem = props=>{
    let TouchableCmp = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >=21){
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
    <Card style = {styles.product}>
        <TouchableCmp onPress={props.onSelect} useForeground>

            <View style={styles.imageContainer}  >
                <Image style={styles.image} source ={{uri: props.image}}/>
            </View>
            <View style ={styles.detail}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
                {props.children}
            </View>
         </TouchableCmp>
        </Card>
    );
}
const styles = StyleSheet.create({
    product:{
       
        height: 300,
        margin: 20,
        overflow:'hidden'

    },
    touchable:{
        width: '100%',
        height:'100%'
    },  
    image:{
        flex:1,
        width:'100%',
        height:'60%'
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:18,
        marginVertical: 4
    },
    price:{
        fontFamily:'open-sans',
        fontSize:14,
        color:'#888'
    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:'25%',
        paddingHorizontal:20
    },
    detail:{
        fontFamily:'open-sans',
        alignItems:'center',
        height:'15%',
        padding:10
    },
    imageContainer:{
        
        width:'100%',
        height:'60%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow:'hidden'
    }

});

export default ProductItem;