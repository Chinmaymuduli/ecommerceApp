import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, Pressable, Text} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
const Home = ({drawerAnimationStyle}: any) => {
  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        ...drawerAnimationStyle,
      }}>
      <Text>hello</Text>
    </Animated.View>
  );
};

export default Home;

const styles = StyleSheet.create({});
