import { StatusBar } from 'react-native';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Navigator from './app/navigation';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Navigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }
})