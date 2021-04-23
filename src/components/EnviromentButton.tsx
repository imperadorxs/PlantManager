import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

const EnviromentButton = ({ title = "all", active = false, ...rest }: EnviromentButtonProps) => {
  return (
    <RectButton style={[styles.container, active && styles.containerActive]} {...rest}>
      <Text style={[styles.text, active && styles.textActive]}>{title}</Text>
    </RectButton>);
}

export default EnviromentButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.shape,
    width: 76,
    height: 40,
    borderRadius: 12,
    marginHorizontal: 5,
    marginRight: 10,
  },
  containerActive: {
    backgroundColor: colors.green_light
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.text
  },
  textActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  }
});