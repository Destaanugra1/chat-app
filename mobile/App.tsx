import { StatusBar, TextInput, Touchable, TouchableOpacity } from 'react-native';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import colors from './app/utils/color';
import FormInpunt from './app/ui/FormInpunt';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerForm}>
        <Text style={styles.textxl}>Sign in</Text>

        <FormInpunt placeholder='Masukkan Email' autoCapitalize='none' keyboardType='email-address'/>
        <FormInpunt  placeholder='masukkan password' autoCapitalize='none' secureTextEntry={true}/>

        <TouchableOpacity style={styles.button}>
          <Text style={{ color: colors.white }}>Sig In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
  }
})