import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import Slides from '../components/Slides';
import { AppLoading } from 'expo';
import _ from 'lodash';

const SLIDE_DATA = [
  {
    text: 'Welcome to JobApp',
    color: '#6a2073'
  },
  {
    text: 'Use this app to get a Job',
    color: '#6a2073'
  },
  {
    text: 'Set your location, then swipe away',
    color: '#6a2073'
  }
];

class WelcomeScreen extends Component {
  state = { token: null }

  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
      this.props.navigation.navigate('map');
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  }
  
  onSlidesComplete = () => {  // Arrow functions alredy do .bind(this) to the prop
    this.props.navigation.navigate('auth');
  }

  render() {
    if(_.isNull(this.state.token)) {
      return <AppLoading />
    }

    return (
      <View>
        <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
      </View>
    )
  }
}

export default WelcomeScreen;