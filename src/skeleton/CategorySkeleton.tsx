import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Skeleton, VStack} from 'native-base';

const CategorySkeleton = () => {
  return (
    <>
      <VStack pr={5} mt={4}>
        <Skeleton
          borderWidth={1}
          borderColor="coolGray.200"
          endColor="warmGray.50"
          // size="20"
          width={70}
          height={70}
          rounded="full"
        />
        <Skeleton.Text lines={1} alignItems="center" mt={1} />
      </VStack>
    </>
  );
};

export default CategorySkeleton;

const styles = StyleSheet.create({});
