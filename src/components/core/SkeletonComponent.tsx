import {Box, Skeleton, VStack} from 'native-base';
import React from 'react';

export default function SkeletonComponent() {
  return (
    <>
      <Box w={120} h={120}>
        <VStack
          w="90%"
          maxW="400"
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

          <Skeleton.Text px="2" py="2" />
        </VStack>
      </Box>
    </>
  );
}
