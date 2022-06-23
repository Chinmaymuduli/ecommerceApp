import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {Box, HStack, Image, Pressable, Stack, Text} from 'native-base';
import {COLORS} from 'configs';
import {Rating} from 'react-native-ratings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {WishListCardType} from 'types';

type Props = {
  item: WishListCardType;
};

const WishListCard = ({item}: Props) => {
  return (
    <>
      <Box
        w={Dimensions.get('window').width / 2.2}
        borderWidth={1}
        m={2}
        borderColor={COLORS.lightGrey}
        borderRadius={5}>
        <Pressable>
          <Image
            source={item?.img}
            style={styles.image}
            alt={'wishlistImg'}
            resizeMode={'contain'}
            bg={'#f0fdf4'}
            borderRadius={5}
          />
          <Stack px={2} space={1}>
            <Text bold color={'gray.400'} mt={2}>
              {item?.label}
            </Text>
            <HStack space={2}>
              <Text fontFamily={'Nunito-Bold'}>&#8377;{item?.price}</Text>
              <Text textDecorationLine={'line-through'} color={'gray.400'}>
                &#8377;{item?.discount}
              </Text>
              <Text color={'green.500'} bold>
                {item?.offer}
              </Text>
            </HStack>
            <HStack>
              <Rating
                type="custom"
                startingValue={item.ratingsby}
                ratingColor={'green'}
                tintColor={'#fff'}
                ratingBackgroundColor={COLORS.grey}
                ratingCount={5}
                imageSize={17}
                style={{paddingVertical: 5}}
              />
            </HStack>
          </Stack>
          <Pressable
            onPress={() => console.log('pressed')}
            position={'absolute'}
            bg={COLORS.textWhite}
            borderRadius={30}
            right={2}
            top={1}>
            <Ionicons
              name="close"
              size={20}
              color={COLORS.danger}
              style={{padding: 4}}
            />
          </Pressable>
        </Pressable>
        <Box px={3} py={3}>
          <Box borderWidth={1} borderRadius={4} borderColor={COLORS.lightGrey}>
            <Text textAlign={'center'} color={'#15803d'} bold py={1}>
              Add To Cart
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default WishListCard;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 100,
  },
});
