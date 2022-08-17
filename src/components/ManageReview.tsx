import {StyleSheet} from 'react-native';
import React from 'react';
import {
  Actionsheet,
  Box,
  Heading,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import {COLORS} from 'configs';
import {Rating} from 'react-native-ratings';
import {useSwrApi} from 'hooks';
import {ReviewType} from 'types';
import {REVIEW, REVIEW_IMAGE} from 'assets';
import {Empty} from './core';
type Props = {
  productId: string;
};
const ManageReview = ({productId}: Props) => {
  const {data} = useSwrApi(`reviews/product/${productId}`);
  const ReviewData: ReviewType[] = data?.data?.data?.data;

  const {isOpen, onOpen, onClose} = useDisclose();
  return (
    <>
      {ReviewData?.length > 0 && (
        <Box mt={4}>
          <HStack alignItems={'center'} justifyContent={'space-between'}>
            <Heading size={'xs'} letterSpacing={1}>
              Product Review (5)
            </Heading>
            <Pressable onPress={onOpen}>
              <Text bold color={COLORS.primary}>
                {' '}
                See All
              </Text>
            </Pressable>
          </HStack>
          {ReviewData?.map(item => (
            <Box key={item?.user?._id} mt={3} bg={'#ECFFDC60'} borderRadius={6}>
              <Box px={4} py={2}>
                <HStack space={2} alignItems={'center'}>
                  <Image
                    alt="img"
                    source={
                      item?.user?.photoURL
                        ? {uri: item?.user.photoURL}
                        : REVIEW_IMAGE
                    }
                    resizeMode={'contain'}
                    borderRadius={50}
                    style={{
                      height: 50,
                      width: 50,
                    }}
                  />
                  <VStack>
                    <Text fontSize={15}>{item?.user?.displayName}</Text>

                    <HStack space={1}>
                      <Rating
                        type="custom"
                        startingValue={item?.rating}
                        ratingColor={'#F5B21E'}
                        tintColor={'#fff'}
                        ratingBackgroundColor={COLORS.grey}
                        ratingCount={5}
                        imageSize={20}
                        readonly={true}
                      />
                    </HStack>
                  </VStack>
                </HStack>
                <Text mt={1} fontSize={12} bold>
                  {item?.title}
                </Text>
                <Text mt={1} fontSize={13}>
                  {item?.comment}
                </Text>
              </Box>
            </Box>
          ))}
          {/* Actionsheet */}
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  width: '100%',
                }}>
                <Heading size={'md'} px={4}>
                  Reviews
                </Heading>
                {ReviewData?.length > 0 ? (
                  <Box px={4}>
                    {ReviewData.map(item => (
                      <Box
                        px={4}
                        py={2}
                        key={item.user?._id}
                        mt={3}
                        bg={'#ECFFDC60'}
                        borderRadius={6}>
                        <Box w={'full'}>
                          <HStack space={2} alignItems={'center'}>
                            <Image
                              alt="img"
                              source={
                                item?.user?.photoURL
                                  ? {uri: item?.user?.photoURL}
                                  : REVIEW_IMAGE
                              }
                              resizeMode={'contain'}
                              borderRadius={50}
                              style={{
                                height: 50,
                                width: 50,
                              }}
                            />
                            <VStack>
                              <Text fontSize={15}>
                                {item?.user?.displayName}
                              </Text>
                              <HStack>
                                <Rating
                                  type="custom"
                                  startingValue={item?.rating}
                                  ratingColor={'#F5B21E'}
                                  tintColor={'#fff'}
                                  ratingBackgroundColor={COLORS.grey}
                                  ratingCount={5}
                                  imageSize={20}
                                  readonly={true}
                                />
                              </HStack>
                            </VStack>
                          </HStack>
                          <Text mt={1} fontSize={12} bold>
                            {item?.title}
                          </Text>
                          <Text mt={1} fontSize={13}>
                            {item?.comment}
                          </Text>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Box>
                    <Empty
                      animation={REVIEW}
                      title={'No review found yet!'}
                      h={80}
                    />
                  </Box>
                )}
              </ScrollView>
            </Actionsheet.Content>
          </Actionsheet>
        </Box>
      )}
    </>
  );
};

export default ManageReview;

const styles = StyleSheet.create({});
