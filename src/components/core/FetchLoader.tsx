import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Box, Image} from 'native-base';
import {LOADER, LOADER_IMG} from 'assets';
import LottieView from 'lottie-react-native';
const FetchLoader = () => {
  return (
    <>
      <Box
        bg={'white'}
        flex={1}
        alignItems={'center'}
        justifyContent={'center'}>
        <LottieView source={LOADER_IMG} loop={true} autoPlay />
      </Box>
    </>
  );
};

export default FetchLoader;

const styles = StyleSheet.create({});
