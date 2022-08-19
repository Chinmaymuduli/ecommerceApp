import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Skeleton, VStack} from 'native-base';

const ProductSkeleton = () => {
  return (
    <>
      <VStack mt={3} mb={4} mr={2}>
        <VStack
          h={120}
          w={120}
          borderWidth="1"
          space={8}
          overflow="hidden"
          rounded="md"
          _dark={{
            borderColor: 'coolGray.500',
          }}
          _light={{
            borderColor: 'coolGray.200',
          }}>
          <Skeleton h="40" />
        </VStack>
        <Skeleton.Text lines={1} mt={3} />
      </VStack>
    </>
  );
};

export default ProductSkeleton;

const styles = StyleSheet.create({});
