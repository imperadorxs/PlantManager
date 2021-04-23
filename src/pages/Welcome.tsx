import React from 'react';
import { Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, Dimensions, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function Welcome() {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate('UserIdentification');
  }

  return (<SafeAreaView style={styles.container}>
    <View style={styles.wrapper}>
      <Text style={styles.title}>Gerencie {'\n'}
     suas plantas de{'\n'} forma fácil</Text>
      <Image source={wateringImg} style={styles.image} resizeMode='contain' />
      <Text style={styles.subtitle}>Não esqueça mais de regar suas plantas.
      Nós cuidamos de lembar você sempre que precisar.
    </Text>
      <TouchableOpacity onPress={handleStart} style={styles.button} activeOpacity={0.7}>
        <Feather name="chevron-right" style={styles.buttonIcon} />
      </TouchableOpacity>
    </View>
  </SafeAreaView>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: fonts.heading,
    lineHeight: 34,
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38,
  },
  image: {
    height: Dimensions.get('window').width * 0.7
  },
  subtitle: {
    fontFamily: fonts.heading,
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 28,
    color: colors.heading
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
  buttonIcon: {
    fontSize: 32,
    color: colors.white,
  }
})