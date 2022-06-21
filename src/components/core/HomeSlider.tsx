import {StyleSheet} from 'react-native';
import React from 'react';
import {FlatList} from 'native-base';
import {SLIDERDATA} from '../../constants';

import HomeSliderCards from '../HomeSliderCards';

const HomeSlider = () => {
  const renderSliderItem = ({item}: {item: any}) => {
    return <HomeSliderCards item={item} />;
  };

  return (
    <>
      <FlatList
        data={SLIDERDATA}
        renderItem={renderSliderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default HomeSlider;

const styles = StyleSheet.create({});
