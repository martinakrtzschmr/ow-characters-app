import { Constants, Notifications } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, Platform, Alert } from 'react-native';
import { 
  createBottomTabNavigator, 
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import registerForNotifications from './services/push_notifications';

import {store, persistor} from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

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
            title: 'Liked',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              return <Ionicons name="md-heart" size={30} color={tintColor} />
            },
            headerStyle: styles.stackHeaderStyle,
          }
        })
      }
    }), navigationOptions: { tabBarVisible: false }
  },
});

const AppContainer = createAppContainer(navigation);

export default class App extends React.Component {
  componentDidMount() {
    //registerForNotifications();
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;

      if (origin === 'received' && text) {
        Alert.alert();
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate 
          loading={null}
          persistor={persistor}
        >
          <View style={styles.container}>
            <AppContainer />
          </View>
        </PersistGate>
      </Provider>
    )
  }
}