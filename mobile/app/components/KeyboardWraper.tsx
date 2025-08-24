import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { Component, ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const KeyboardWraper: React.FC<Props> = ({ children }) => { {children}
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={Styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
};

const Styles =  StyleSheet.create({
  container: {
    flex: 1
  }
});

export default KeyboardWraper