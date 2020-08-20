import React from 'react';
import { Platform} from 'react-native';
import {createAppContainer} from 'react-navigation';
import { createDrawerNavigator} from 'react-navigation-drawer';
import { createStackNavigator} from 'react-navigation-stack';
import {} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons';
import Color from '../constants/Color';
import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import CartScreen from '../screens/shop/CartScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

const defaultNavigation = {
    headerStyle:{
        backgroundColor: Platform.OS === 'android'? Color.primary :''
    },
    headerTitleStyle:{
        fontFamily:'open-sans-bold',
    },
    headerBackTitleStyle:{
        fontFamily:'open-sans-bold',
    },
    headerTintColor:Platform.OS === 'android' ? 'white' : Color.primary
}


const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetails: ProductDetailScreen,
    Cart: CartScreen
}, {
    navigationOptions: {
        drawerIcon: drawerCongig => <Ionicons
            name={Platform.OS === 'android'?'md-cart':'ios-cart'}
            size={23}
            color={drawerCongig.tintColor}
        />
    },
    defaultNavigationOptions: defaultNavigation
});

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen,

},{
    navigationOptions:{
        drawerIcon: drawerConfig => <Ionicons 
            name={Platform.OS === 'android'? 'md-list':'ios-list' }
            size={20}
            color={drawerConfig.tintColor}
            />
    },
    defaultNavigationOptions: defaultNavigation
})
const AdminNavigator = createStackNavigator({
    UserProducts: UserProductScreen,
    EditProducts: EditProductScreen
}, {
    navigationOptions:{
        drawerIcon: drawerConfig => <Ionicons 
                name={Platform.OS === 'android'? 'md-create': 'ios-create'}
                size={23}
                color={drawerConfig.tintColor}
            />
        
    },
    defaultNavigationOptions: defaultNavigation

})
const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Color.primary
    }
})



export default createAppContainer(ShopNavigator)