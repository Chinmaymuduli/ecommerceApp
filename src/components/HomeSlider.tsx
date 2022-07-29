import {StyleSheet} from 'react-native';
import React from 'react';
import {FlatList} from 'native-base';
import {SLIDER_DATA} from '../constants';
import HomeSliderCards from './HomeSliderCards';

const HomeSlider = () => {
  return (
    <>
      <FlatList
        data={SLIDER_DATA}
        renderItem={({item}) => <HomeSliderCards item={item} />}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default HomeSlider;

const styles = StyleSheet.create({});
