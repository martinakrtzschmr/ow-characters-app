import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
  static navigationOptions =  ({ navigation }) => ({
    headerTitle: 'Review Jobs',
    headerRight: (
      <Button
        title="Settings"
        onPress={() => {
          navigation.navigate("settings");
        }}
      />
    )
  });

  renderLikedJobs() {
    return this.props.likes.map(job => {
      const { name, text } = job; // url, form attedRelativeTime
      // const initialRegion = {
      //   longitude: -23.669092,
      //   latitude: -46.700521,
      //   latitudeDelta: 0.045,
      //   longitudeDelta: 0.02,
      // }

      return (
        <Card
          title={job.name}
          key={job.id}
          image={{ uri: job.uri }}
          imageStyle={{ height: 200, width: 110, alignSelf: 'center' }}
        >
          <View>
            {/* <MapView
              scrollEnabled={false}
              style={{ flex: 1 }}
              cacheEnabled={ Platform.OS === 'android' }
              initialRegion={initialRegion}
            /> */}
            <View style={ styles.detailWrapper }>
              {/* <Text style={styles.italics} >{name}</Text> */}
              <Text style={[styles.italics, { textAlign: 'center' }]} >{text}</Text>
            </View>
            <Button 
              title="Check out Overwatch!"
              backgroundColor="#03A9F4"
              // onPress={() => Linking.openURL(job.url)} //
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        { this.renderLikedJobs() }
      </ScrollView>
    )
  }
}

const styles = {
  detailWrapper: {
    marginBottom: 10,
    // flexDirection: 'row',
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  }
}

function mapStateToProps(state) {
  return { likes: state.likes };
}

export default connect(mapStateToProps)(ReviewScreen);