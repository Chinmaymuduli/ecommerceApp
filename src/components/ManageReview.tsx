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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Rating} from 'react-native-ratings';
const ReviewArray = [
  {
    id: 1,
    name: 'John Doe',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRqRyIiwYCq4s-fZi1zdmyfSuIPUvg9EyZ_Q&usqp=CAU',
    rating: 5,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    name: 'Andrea Joanne',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPpMBs9YQ1UdrPoQ_Il0-wpIl4f8h9yIw0q3CgBXekef0-g38UaGOJZ0dcZRbvPvO4GkU&usqp=CAU',
    rating: 4,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 3,
    name: 'John Doe Harry',
    img: 'https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg',
    rating: 3,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 4,
    name: 'John Doe Harry',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkFD7rVDIsj77R6CBhfwmiidoHUQY76Ze4ShORloVE-_ECfbYnDCVri9odpInT7eHXyHw&usqp=CAU',
    rating: 5,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 5,
    name: 'John Doe Harry',
    img: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/160441345/original/c06e5f7be89c848c786a9b948539071e8c3a70e1/draw-portrait-avatar-cartoon-from-photo.jpg',
    rating: 3,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];
const ManageReview = () => {
  const ShowReview = ReviewArray.slice(0, 2);
  const {isOpen, onOpen, onClose} = useDisclose();
  return (
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
      {ShowReview.map(item => (
        <Box key={item.id} mt={3} bg={'#ECFFDC60'} borderRadius={6}>
          <Box px={4} py={2}>
            <HStack space={2} alignItems={'center'}>
              <Image
                alt="img"
                source={{uri: item?.img}}
                resizeMode={'contain'}
                borderRadius={50}
                style={{
                  height: 50,
                  width: 50,
                }}
              />
              <VStack>
                <Text fontSize={15}>{item?.name}</Text>
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
            <Text mt={1} fontSize={13}>
              {item?.review}
            </Text>
          </Box>
        </Box>
      ))}
      {/* Actionsheet */}
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Heading size={'md'} px={2}>
              Reviews
            </Heading>
            <Box>
              {ReviewArray.map(item => (
                <Box key={item.id} mt={3} bg={'#ECFFDC60'} borderRadius={6}>
                  <Box px={4} py={2}>
                    <HStack space={2} alignItems={'center'}>
                      <Image
                        alt="img"
                        source={{uri: item?.img}}
                        resizeMode={'contain'}
                        borderRadius={50}
                        style={{
                          height: 50,
                          width: 50,
                        }}
                      />
                      <VStack>
                        <Text fontSize={15}>{item?.name}</Text>
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
                    <Text mt={1} fontSize={13}>
                      {item?.review}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Box>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

export default ManageReview;

const styles = StyleSheet.create({});
