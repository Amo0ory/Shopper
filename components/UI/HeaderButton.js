import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons';
import {View, StyleSheet, Text, Platform} from 'react-native';
import Color from '../../constants/Color';

const CustomHeaderButton = props=>{
    return<HeaderButton 
            {...props} 
            IconComponent={Ionicons} 
            iconSize={26}
            color= {Platform.OS ==='android'? 'white': Color.primary}
            
            />
};

const styles = StyleSheet.create({

});

export default CustomHeaderButton;