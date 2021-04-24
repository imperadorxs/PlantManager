import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/core';

import Button from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug';
  nextScreen: string;
}

const emojis = {
  hug: '🤗',
  smile: '😄',
}

const Confirmation = () => {
  const navigation = useNavigation();
  const routes = useRoute();

  const { title, subtitle, buttonTitle, icon, nextScreen } = routes.params as Params;

  function handleStart() {
    navigation.navigate(nextScreen);
  }

  return (<SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.emoji}>
        {emojis[icon]}
      </Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
      <View style={styles.footer}>
        <Button onPress={handleStart} title={buttonTitle} />
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