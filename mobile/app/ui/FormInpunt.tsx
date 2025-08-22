import { View, Text, TextInput, StyleSheet, SafeAreaView, TextInputProps } from 'react-native'
import React, { FC, useState } from 'react'
import colors from '../utils/color'

interface FormInputProps extends TextInputProps { }

const FormInpunt: FC<FormInputProps> = (props) => {
    const [isActive, setIsActive] = useState(false);
    return (

        <TextInput style={[styles.input, isActive ? styles.inputActive : styles.inputdeActive]} {...props} onFocus={() => setIsActive(true)} onBlur={() => setIsActive(false)} />

    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        width: '80%',
        marginBottom: 10,
        color: colors.white
    },
    inputActive: {
        borderWidth: 2,
        borderColor: colors.primary
    },
    inputdeActive: {
        borderWidth: 2,
        borderColor: colors.deactive
    }
})

export default FormInpunt