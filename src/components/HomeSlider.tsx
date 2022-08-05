import {StyleSheet} from 'react-native';
import React from 'react';
import {FlatList} from 'native-base';
import HomeSliderCards from './HomeSliderCards';
import {useSwrApi} from 'hooks';
import {BannerType} from 'types';

const HomeSlider = () => {
  const {data, mutate} = useSwrApi('banners');
  const BannerData: BannerType[] = data?.data?.data;
  return (
    <>
      <FlatList
        data={BannerData}
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
