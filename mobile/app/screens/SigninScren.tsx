import { View, Text, TouchableOpacity, StatusBar, Platform, StyleSheet } from 'react-native'
import React from 'react'
import FormInpunt from '../ui/FormInpunt'
import KeyboardWraper from '../components/KeyboardWraper'
import colors from '../utils/color'
import { Link } from '@react-navigation/native'

const SigninScren = () => {
  return (
   <KeyboardWraper >
      <View style={styles.containerForm}>
        <Text style={styles.textxl}>Log<Text style={{color: colors.primary}}>in</Text></Text>

        <FormInpunt placeholder='Masukkan Email' autoCapitalize='none' keyboardType='email-address'/>
        <FormInpunt  placeholder='masukkan password' autoCapitalize='none' secureTextEntry={true}/>

       

        <TouchableOpacity style={styles.button}>
          <Text style={{ color: colors.white }}>Sig In</Text>
        </TouchableOpacity>
         <View style={styles.formDivinder} />

         {/* {Deskripsi} */}
         <Text>Belum ada akun silahkan Di <Link action={{type:'NAVIGATE', payload:{name: "SignUp"}}}>Sini</Link></Text>
      </View>
      </KeyboardWraper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
    backgroundColor: '#ffffffff',
    color: colors.white
  }, containerForm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgColor,
    padding: 15
  },
  textxl: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 15,
    color: colors.white
  },
  button: {
    borderRadius: 15,
    width: '80%',
    backgroundColor: colors.primary,
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
    color: colors.white
  },
  formDivinder: {
    alignSelf: 'center',
    marginVertical: 10,
    height: 2,
    width: '70%',
    backgroundColor: colors.primary
  }
})

export default SigninScren