import _ from 'lodash';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Text, View } from 'react-native';

import Star from './components/Star'

export default class TapRating extends Component {
  static defaultProps = {
    defaultRating: 3,
    reviews: ["Terrible", "Bad", "Okay", "Good", "Great"],
    count: 5,
    showRating: true,
    reviewColor: 'rgba(230, 196, 46, 1)',
    reviewSize: 25
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { defaultRating } = nextProps;

    if (defaultRating !== prevState.defaultRating) {
      return {
        position: defaultRating,
        defaultRating
      }
    }
    return null;
  }

  constructor() {
    super()

    this.state = {
      position: 5
    }
  }

  componentDidMount() {
    const { defaultRating } = this.props

    this.setState({ position: defaultRating })
  }

  renderStars(rating_array) {
    return _.map(rating_array, (star, index) => {
      return star
    })
  }

  starSelectedInPosition(position) {
    const { onFinishRating } = this.props

    if (typeof onFinishRating === 'function') onFinishRating(position);

    this.setState({ position: position })
  }

  render() {
    const { position } = this.state
    const { count, reviews, showRating, reviewColor, reviewSize } = this.props
    const rating_array = []
    const starContainerStyle = [styles.starContainer]

    if (this.props.starContainerStyle) {
        starContainerStyle.push(this.props.starContainerStyle);
    }

    const min = Math.floor(position)
    const max = Math.round(count)
    const currentRatingIndex = Math.max(min, max)
    if(min==max) {
      _.times(count, index => {
        rating_array.push(
          <Star
            key={index}
            position={index + 1}
            starSelectedInPosition={this.starSelectedInPosition.bind(this)}
            fill={position >= index + 1}
            {...this.props}
          />
        )
      })
    } else {
      _.times(currentRatingIndex, index => {
        rating_array.push(
          position >= index + 1 ? (<Star
                      key={index}
                      position={index + 1}
                      starSelectedInPosition={this.starSelectedInPosition.bind(this)}
                      fill={position >= index + 1}
                      {...this.props}
                    />) : (
                    <View>
            <View style={{ width:(this.props.size+6)*(1-(max*100 - position*100)/100), height:this.props.size, alignItems:'flex-start',justifyContent:'center', overflow: 'hidden' }}>
              <Star
                key={index}
                position={index + 1}
                starSelectedInPosition={this.starSelectedInPosition.bind(this)}
                fill={true}
                {...this.props}
              />
            </View>
            <View 
                style={{position:'absolute',top:0,left:0, height:this.props.size, width:this.props.size, alignItems:'flex-start',justifyContent:'center',zIndex:-1}}>
              <Star
                key={index}
                position={index + 1}
                starSelectedInPosition={this.starSelectedInPosition.bind(this)}
                fill={false}
                {...this.props}
              />
              </View>
              </View>
            )
        )
      })
    }


    return (
      <View style={styles.ratingContainer}>
        { showRating &&
          <Text style={[styles.reviewText, {fontSize: reviewSize, color: reviewColor}]}>
            {reviews[position - 1]}
          </Text>
        }
        <View style={starContainerStyle}>
          {this.renderStars(rating_array)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ratingContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewText: {
    fontWeight: 'bold',
    margin: 10,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
