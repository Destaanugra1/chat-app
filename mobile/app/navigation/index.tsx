import { View, Text } from 'react-native'
import React from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './authNavigation';
import colors from '../utils/color';

const myTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: colors.bgColor
    }
}
const Navigator = () => {
  return (
    <NavigationContainer theme={myTheme}>
        <AuthNavigation />
    </NavigationContainer>
  )
}

export default Navigator
