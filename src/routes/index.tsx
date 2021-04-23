import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './stack.routes';
import { StatusBar } from 'react-native';

const Routes = () => {
  return (<NavigationContainer>
    <StatusBar barStyle="default" />
    <StackRoutes />
  </NavigationContainer>)
}


export default Routes;