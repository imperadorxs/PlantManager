import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text
} from 'react-native';

import { useNavigation } from '@react-navigation/core';

import Button from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

const Confirmation = () => {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate('PlantSelect');
  }

  return (<SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.emoji}>
        😄
      </Text>
      <Text style={styles.title}>Prontinho</Text>
      <Text style={styles.subtitle}>
        Agora vamos começar a cuidar das suas
        plantinhas com muito cuidado.
      </Text>
      <View style={styles.footer}>
        <Button onPress={handleStart} title="Começar" />
      </View>
    </View>

  </SafeAreaView>)
}

export default Confirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  emoji: {
    fontSize: 78,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15
  },
  subtitle: {
    fontFamily: fonts.text,
    textAlign: 'center',
    fontSize: 17,
    paddingVertical: 10,
    color: colors.heading
  },
  footer: {
    width: '100%',
    paddingHorizontal: 75,
    marginTop: 20
  }
});