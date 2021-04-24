import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';


const UserIdentification = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  const navigation = useNavigation();

  async function handleSubmit() {
    if (!name) {
      return Alert.alert(`Me diz como chamar você 😥`);
    }
    try {
      await AsyncStorage.setItem('@plantmanager:user', name);
      navigation.navigate('Confirmation', {
        icon: 'smile',
        title: 'Prontinho',
        subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
        buttonTitle: 'Começar',
        nextScreen: 'PlantSelect',
      });
    } catch {
      Alert.alert('Não foi possível salvar o seu nome');
    }
  }

  function handleInputBlur() {
    setIsFocused(false);
  }

  function handleInputFocus() {
    setIsFocused(true);
    setIsFilled(!!name);
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setName(value);
  }

  return (<SafeAreaView style={styles.container}>
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.content}>
        <View style={styles.form}>
          <View style={styles.header}>
            <Text style={styles.emoji}>{isFilled ? '😁' : '😊'}</Text>
            <Text style={styles.title}>Como podemos{'\n'} chamar você?</Text>
          </View>
          <TextInput style={[styles.input, (isFocused || isFilled) && { borderColor: colors.green }]} onChangeText={handleInputChange} placeholder="Digite um nome" onBlur={handleInputBlur} onFocus={handleInputFocus} />
          <View style={styles.footer}>
            <Button onPress={handleSubmit} />

          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  </SafeAreaView>)
}

export default UserIdentification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center'
  },
  header: {
    alignItems: 'center',

  },

  emoji: {
    fontSize: 44,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    marginTop: 20,
    fontFamily: fonts.heading,
    color: colors.heading,
    textAlign: 'center'
  },
  footer: {
    marginTop: 40,
    width: '100%',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  }
})