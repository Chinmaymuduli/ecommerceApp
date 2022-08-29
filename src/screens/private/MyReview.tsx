import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Box,
  Center,
  FlatList,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from 'native-base';
import {COLORS} from 'configs';
import {REVIEW, ReviewImg} from 'assets';
import {Rating} from 'react-native-ratings';
import {MyReviewCard} from 'components';
import {reviewType} from 'types';
import {useSwrApi} from 'hooks';
import {useIsFocused} from '@react-navigation/native';
import {FetchLoader} from 'components/core';

const MyReview = () => {
  const {data, isValidating, mutate} = useSwrApi('my-reviews');
  const MyReviewData: reviewType[] = data?.data?.data?.data;

  const isFocused = useIsFocused();
  useEffect(() => {
    mutate();
  }, [isFocused]);

  return (
    <>
      {isValidating ? (
        <FetchLoader />
      ) : (
        <Box flex={1} bg={COLORS.textWhite}>
          <Box>
            <FlatList
              data={MyReviewData?.length > 0 ? MyReviewData : []}
              renderItem={({item}) => (
                <MyReviewCard item={item} reviewMutate={mutate} />
              )}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <>
                  <Box mt={100}>
                    <Center>
                      <Image
                        source={ReviewImg}
                        style={styles.ReviewImg}
                        alt={'ReviewImg'}
                      />
                      <Heading mt={2}>No Review Found</Heading>
                    </Center>
                  </Box>
                </>
              )}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default MyReview;

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
  },
  ReviewImg: {
    width: 300,
    height: 300,
  },
});
