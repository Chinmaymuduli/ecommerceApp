import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Center,
  FlatList,
  Heading,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import {COLORS} from 'configs';
import {AYUSH_1, AYUSH_2, REVIEW, ReviewImg} from 'assets';
import {Rating} from 'react-native-ratings';
import LottieView from 'lottie-react-native';
import {Empty} from 'components/core';

const MyReviewArr = [
  {
    img: AYUSH_1,
    name: 'Mahua laddu',
    rating: 4,
    date: '12/05/2022',
    review:
      ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. The product is so beautifull so i recommend you to buy it.',
  },

  {
    img: AYUSH_2,
    name: 'Ayushmati Oil',
    rating: 4,
    date: '10/04/2022',
    review:
      ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. The product is so beautifull so i recommend you to buy it.',
  },
];

const MyReview = () => {
  const [ratings, setRatings] = useState(4);

  const renderItem = ({item}: any) => {
    return (
      <Box bg={COLORS.lightGrey}>
        <Box bg={COLORS.textWhite} mx={2} mb={2} mt={1}>
          <Box px={4}>
            <HStack space={4} alignItems={'center'}>
              <Box h={100} alignItems={'center'} justifyContent={'center'}>
                <Image
                  source={item?.img}
                  style={styles.image}
                  alt={'reviewImg'}
                  resizeMode="contain"
                />
              </Box>
              <VStack space={1}>
                <Text bold fontSize={15}>
                  {item?.name}
                </Text>
                <HStack alignItems={'center'}>
                  <Rating
                    type="custom"
                    startingValue={item?.rating}
                    ratingColor={'green'}
                    tintColor={'#fff'}
                    ratingBackgroundColor={COLORS.grey}
                    ratingCount={5}
                    imageSize={30}
                    readonly={true}
                  />
                </HStack>
                <Text>{item?.date}</Text>
              </VStack>
            </HStack>
            <Box mb={2}>
              <Text>{item?.review}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box flex={1} bg={COLORS.textWhite}>
      <Box>
        <FlatList
          data={MyReviewArr.length > 0 ? MyReviewArr : []}
          renderItem={renderItem}
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
