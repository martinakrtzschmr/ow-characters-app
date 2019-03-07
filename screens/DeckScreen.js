import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button } from 'react-native-elements';
import Swipe from '../components/Swipe';
import * as actions from '../actions';

class DeckScreen extends Component {
  renderCard(job) {
    const initialRegion = {
      longitude: -23.669092,
      latitude: -46.700521,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02,
    }

    return (
      <Card 
        title={job.name}
        image={{ uri: job.uri }}
        imageStyle={{ height: 200, width: 110, alignSelf: 'center' }}
      >
        {/* <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={ Platform.OS === 'android' }
            initialRegion={initialRegion}
          />
        </View> */}
        {/* <View style={ styles.detailWrapper } >
          <Text>{job.name}</Text>
        </View> */}
        <Text style={{ textAlign: 'center' }} >
          {job.text}</Text>
      </Card>
    )
  }

  renderNoMoreCards = () => {
    return (
      <Card title="No more data" >
        <Button
          title="Back To Map"
          large
          icon={{ name: 'my-location' }}
          backgroundColor="#03A9F4"
          onPress={() => this.props.navigation.navigate('map')}
        />
      </Card>
    )
  }

  render() {
    return (
      <View style={ styles.swipe }>
        <Swipe 
          data={ this.props.jobs }
          renderCard={ this.renderCard }
          renderNoMoreCards={ this.renderNoMoreCards }
          onSwipeRight={ job => this.props.likeJob(job) }
          // onSwipeLeft={ job => this.props.dislikeJob(job) }
        />
      </View>
    )
  }
}

const styles = {
  detailWrapper: {
    flexDirecton: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  swipe: {
    marginTop: 25,
  }
}

const mapStateToProps = (state) => {
  return { jobs: state.jobs }; // Use '.results' if information comes from API request, right now, it`s hard coded.s
}

export default connect(mapStateToProps, actions)(DeckScreen);