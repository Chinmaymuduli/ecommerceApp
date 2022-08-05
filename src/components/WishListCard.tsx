import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {Box, HStack, Image, Pressable, Stack, Text} from 'native-base';
import {COLORS} from 'configs';
import {Rating} from 'react-native-ratings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CartItemType, CategoryType, ProductType, WishListCardType} from 'types';
import {useStore} from 'app';
import {useIsMounted, useSwrApi} from 'hooks';
import {put, remove} from 'api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  item: CartItemType;
  setAlertMessage: (prev: string) => void;
  setShownAlert: (previous: boolean) => void;
};

const WishListCard = ({item, setAlertMessage, setShownAlert}: Props) => {
  const isMounted = useIsMounted();
  const {data, mutate} = useSwrApi('cart/all');
  const wishListCart = data?.data.data?.products;

  const CategoryData = wishListCart?.find((item: {_id: string}) => item);
  const handleAddCart = async () => {
    try {
      await put({
        path: 'cart/add',

        body: JSON.stringify({
          product: item?.product._id,
          quantity: 1,
        }),
      });
      setShownAlert(true);
      setAlertMessage('Added to Cart');
      setTimeout(() => {
        isMounted.current && setShownAlert(false);
      }, 4000);
    } catch (error) {
      console.log(error);
    } finally {
      mutate();
    }
  };

  const removeCart = async () => {
    try {
      await remove({
        path: `cart/${CategoryData._id}`,
      });

      setShownAlert(true);
      setAlertMessage('Remove from Cart');
      setTimeout(() => {
        isMounted.current && setShownAlert(false);
      }, 4000);
    } catch (error) {
      console.log(error);
    } finally {
      mutate();
    }
  };

  const removeWishlist = async () => {
    try {
      const res = await remove({
        path: `wishlist/${item._id}`,
      });
      if (res.status === 200) return mutate();
    } catch (error) {
      console.log(error);
    } finally {
      mutate();
    }
  };

  const cartDataMatch = wishListCart?.some(
    (data: {product: {_id: string}}) =>
      data?.product?._id === item?.product?._id,
  );

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
            source={{
              uri: item?.product?.images?.length
                ? item?.product?.images[0]
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1-r88R2pOX-lj1C6Zn3QO3I_Osu-G3viCm1fUWNVhiDn_mkszDqEn8qXAe3bR1sJo9Pg&usqp=CAU',
            }}
            style={styles.image}
            alt={'wishlistImg'}
            resizeMode={'contain'}
            bg={'#f0fdf4'}
            borderRadius={5}
          />
          <Stack px={2} space={1}>
            <Text bold color={'gray.400'} mt={2}>
              {item?.product?.title}
            </Text>
            <HStack space={2}>
              <Text fontFamily={'Nunito-Bold'}>
                &#8377;{item?.product?.salePrice}
              </Text>
              <Text textDecorationLine={'line-through'} color={'gray.400'}>
                &#8377;{item?.product?.mrp}
              </Text>
              <Text color={'green.500'} bold>
                15 % off
              </Text>
            </HStack>
            <HStack>
              <Rating
                type="custom"
                startingValue={4}
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
            onPress={removeWishlist}
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
        {!cartDataMatch ? (
          <Pressable px={3} py={3} onPress={handleAddCart}>
            <Box
              borderWidth={1}
              borderRadius={4}
              borderColor={COLORS.lightGrey}>
              <Text textAlign={'center'} color={'#15803d'} bold py={1}>
                Add To Cart
              </Text>
            </Box>
          </Pressable>
        ) : (
          <Pressable px={3} py={3} onPress={removeCart}>
            <Box
              borderWidth={1}
              borderRadius={4}
              borderColor={COLORS.lightGrey}>
              <Text textAlign={'center'} color={'#15803d'} bold py={1}>
                Remove From Cart
              </Text>
            </Box>
          </Pressable>
        )}
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
