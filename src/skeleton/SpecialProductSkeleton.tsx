import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Skeleton, VStack} from 'native-base';

const SpecialProductSkeleton = () => {
  return (
    <VStack mb={4}>
      <VStack
        h={140}
        w={Dimensions.get('window').width / 2.4}
        borderWidth="1"
        space={8}
        overflow="hidden"
        rounded="md"
        alignItems={'center'}
        justifyContent={'center'}
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}>
        <Skeleton.Text lines={3} />
      </VStack>
    </VStack>
  );
};

export default SpecialProductSkeleton;

const styles = StyleSheet.create({});
