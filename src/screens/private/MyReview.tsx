import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, Text} from 'native-base';
import {COLORS} from 'configs';

const MyReview = () => {
  return (
    <Box flex={1} bg={COLORS.textWhite}>
      <Box>
        <Text>MyReview</Text>
      </Box>
    </Box>
  );
};

export default MyReview;

const styles = StyleSheet.create({});
