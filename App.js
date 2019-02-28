import Expo, { Constants } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { 
  createBottomTabNavigator, 
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/WelcomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen'; // test

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: Constants.statusBarHeight,
      }
    })
  },
  stackHeaderStyle: {
    ...Platform.select({
      android: {
        marginTop: -Constants.statusBarHeight,
      }
    })
  }
});

const navigation = createBottomTabNavigator({
  welcome: { screen: WelcomeScreen, navigationOptions: { tabBarVisible: false } },
  auth: { screen: AuthScreen, navigationOptions: { tabBarVisible: false } },
  main: {
    screen: createBottomTabNavigator({
      map: { screen: MapScreen },
      deck: { screen: DeckScreen },
      review: {
        screen: createStackNavigator({
          review: { screen: ReviewScreen },
          settings: { screen: SettingsScreen },
        },{
          navigationOptions: {
            headerStyle: styles.stackHeaderStyle
          }
        })
      }
    }), navigationOptions: { tabBarVisible: false }
  },
});

const AppContainer = createAppContainer(navigation);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppContainer />
        </View>
      </Provider>
    )
  }
}