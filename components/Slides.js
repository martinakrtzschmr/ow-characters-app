import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  renderLastSlide(slide, i) {
    if(i === this.props.data.length - 1) {
      return (
        <Button 
          title="Onwards!"
          raised
          type="solid"
          containerStyle={{ marginTop: 30 }}
          buttonStyle={styles.buttonStyle}
          onPress={this.props.onComplete}
        />
      )
    }
  }

  renderSlides() {
    return this.props.data.map((slide, i) => {
      return(
        <View key={i} 
          style={[styles.slideStyle, { backgroundColor: slide.color }]}
        >
          <Text style={styles.textStyle}> {slide.text} </Text>
          { this.renderLastSlide(slide, i) }
        </View>
      )
    })
  }

  render() {
    return (
      <ScrollView
        horizontal // interpreted as true, as value is boolean.
        pagingEnabled
        style={{ height: '100%' }}
      >
        { this.renderSlides() }
      </ScrollView>
    )
  }
}

const styles = {
  slideStyle: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  textStyle: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center'
  },
  buttonStyle: {
    backgroundColor: '#905497',
  }
}

export default Slides;