import React from 'react';
import { StyleSheet, View, Platform, Text, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';


import colors from '../styles/colors';
import UserImg from '../assets/profile.png';
import fonts from '../styles/fonts';


const Header = () => {
  return (<View style={styles.container}>
    <View>
      <Text style={styles.greeting}>Olá,</Text>
      <Text style={styles.userName}>Allan</Text>
    </View>

    <Image style={styles.image} source={UserImg} />

  </View>);
}

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text
  },
  userName: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 40
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  }
});