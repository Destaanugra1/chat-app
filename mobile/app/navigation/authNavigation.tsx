import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text } from 'react-native'
import WelcomeScrenn from '../screens/WelcomeScrenn'
import SigninScren from '../screens/SigninScren'
import SignUpScrenn from '../screens/SignUpScrenn'

export type AuthStackParamslist={
    Welcome: undefined,
    SignIn: undefined,
    SignUp: undefined
}

const Stack = createNativeStackNavigator<AuthStackParamslist>()
const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={WelcomeScrenn} />
        <Stack.Screen name="SignIn" component={SigninScren} />
        <Stack.Screen name="SignUp" component={SignUpScrenn} />
    </Stack.Navigator>
  )
}

export default AuthNavigation