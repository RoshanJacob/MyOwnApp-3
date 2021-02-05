import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { BottomTabNavigator } from './components/BottomTabNavigator';
import WelcomeScreen from './screens/WelcomeScreen';

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen:{
    screen:WelcomeScreen,
  },
  TabNavigator:{
    screen:BottomTabNavigator,
  }
});

const AppContainer = createAppContainer(SwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
