import React, {PureComponent} from 'react';
import {StyleSheet, Animated, TouchableOpacity} from 'react-native';

const STAR_IMAGE = require( '../images/airbnb-star-node' );
const STAR_SELECTED_IMAGE = require( '../images/airbnb-star-selected-node' );
const STAR_SIZE = 40;

export default class Star extends PureComponent {
  static defaultProps = {
    selectedColor: '#f1c40f'
  };

  constructor() {
    super();
    this.springValue = new Animated.Value( 1 );

    this.state = {
      selected: false
    };
  }

  spring() {
    const { position, starSelectedInPosition } = this.props;

    this.springValue.setValue( 1.2 );

    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 2,
        tension: 1
      }
    ).start();

    this.setState( { selected: !this.state.selected } );
    starSelectedInPosition( position );
  }

  render() {
    const { fill, size, selectedColor, isDisabled, starStyle, defaultColor } = this.props;
    const starSource = fill && selectedColor === null ? STAR_SELECTED_IMAGE.uri2 : STAR_IMAGE.uri1;

    return (
      <TouchableOpacity activeOpacity={1} onPress={this.spring.bind( this )} disabled={isDisabled}>
        <Animated.Image
          source={{ uri: starSource }}
          style={[
            styles.starStyle,
            {
              tintColor: fill && selectedColor ? selectedColor : defaultColor,
              width: size || STAR_SIZE,
              height: size || STAR_SIZE,
              transform: [{ scale: this.springValue }]
            },
            starStyle
          ]}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create( {
  starStyle: {
    margin: 3
  }
} );
