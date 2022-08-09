import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Box, HStack, Skeleton, VStack} from 'native-base';

const ProductBannerSkeleton = () => {
  return (
    <>
      <HStack
        mt={5}
        w={300}
        h={150}
        mx={4}
        borderWidth="1"
        space={20}
        rounded="md"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}
        p="4"
        justifyContent={'center'}
        alignItems={'center'}>
        {/* <VStack space="4">
          <Skeleton.Text lines={2} />
        </VStack> */}
        <Box flex="1"></Box>
        <VStack flex="3">
          <Skeleton.Text lines={2} />
          <Skeleton h={5} rounded={'md'} mt={4} w={20} />
        </VStack>
      </HStack>
      {/* <Box
        height={150}
        width={300}
        rounded="md"
        mx={5}
        borderWidth={1}
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}>
        <HStack>
          <Box>
            <Text>hello</Text>
          </Box>
          <VStack>
            <Skeleton.Text lines={2} mt={4} />
            <Skeleton h={4} startColor="indigo.300" mt={4} />
          </VStack>
        </HStack>
      </Box> */}
    </>
  );
};

export default ProductBannerSkeleton;

const styles = StyleSheet.create({});
