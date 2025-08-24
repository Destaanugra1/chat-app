import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../utils/color';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamslist } from '../navigation/authNavigation';

const WelcomeScrenn = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamslist>>();
  return (
    <View style={Styles.container}>
      <Text style={{ ...Styles.title, color: '#fff' }}>
        Xenon <Text style={{ color: colors.primary }}>Chat</Text>
      </Text>
      <Text style={Styles.deskripsi}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium harum numquam dolore dolorem maiores veritatis vero, facilis error nulla ullam.</Text>
      <TouchableOpacity style={Styles.button} onPress={() => {
        navigation.navigate('SignIn')
      }}><Text style={Styles.textColor}>Login</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => {
        navigation.navigate('SignUp')
      }}style={Styles.button}><Text style={Styles.textColor}>Create a new account?</Text></TouchableOpacity>
    </View>
  )
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  deskripsi: {
    textAlign: 'center',
    color: '#fff',
    margin: 15,
  },
  button: {
    borderRadius: 15,
    width: '100%',
    backgroundColor: colors.primary,
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
  },
  textColor: {
    color: colors.white
  }
})

export default WelcomeScrenn