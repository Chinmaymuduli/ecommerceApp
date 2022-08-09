import {Dimensions, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Box, HStack, Image, Pressable, Text} from 'native-base';
import {COLORS} from 'configs';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {useAppContext} from 'contexts';
import Entypo from 'react-native-vector-icons/Entypo';
import {HomeProductType, ProductType} from 'types';
import {put, remove} from 'api';
import {useSwrApi} from 'hooks';
import {SpecialProductSkeleton} from '../../src/skeleton';

type Props = {
  item: ProductType;
  isValidating?: boolean;
};

const SpecialProductCard = ({item, isValidating}: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const [count, setCount] = useState(0);
  const {setCartItems, cartItems} = useAppContext();

  const {data, mutate, isLoading} = useSwrApi('cart/all');
  const CartData = data?.data?.data?.products;

  // const CartCount = CartData?.filter(
  //   (cartId: {product: {_id: string}}) => cartId?.product?._id === item._id,
  // );
  // console.log({CartData});

  const isCartItem = useMemo(
    () =>
      CartData?.some((i: {product: {_id: any}}) => i.product._id === item._id),
    [CartData],
  );
  const quantity = useCallback(
    (id: number) => {
      const res = CartData?.filter(
        (i: {product: {_id: number}}) => i.product._id === id,
      )?.[0];

      return res.quantity;
    },
    [CartData],
  );
  const decrement = async () => {
    try {
      const res = await put({
        path: 'cart/remove',
        body: JSON.stringify({
          product: item._id,
          quantity: -1,
        }),
      });
      if (res.status === 200) return mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const increment = async () => {
    try {
      const res = await put({
        path: 'cart/add',
        body: JSON.stringify({
          product: item._id,
          quantity: 1,
        }),
      });

      if (res.status === 200) return mutate();
    } catch (error) {
      console.log(error);
    }
  };
  const AddSpecialCart = async (item: ProductType) => {
    try {
      const response = await put({
        path: 'cart/add',

        body: JSON.stringify({
          product: item?._id,
          quantity: 1,
        }),
      });
      if (response?.status === 200) return mutate();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isValidating ? (
        <SpecialProductSkeleton />
      ) : (
        <Box mb={5} justifyContent={'center'}>
          <Pressable
            onPress={() =>
              navigation.navigate('ProductDetails', {ProductDetailsType: item})
            }
            borderWidth={1}
            mr={5}
            borderRadius={6}
            borderColor={COLORS.lightGrey}>
            <Box
              h={110}
              w={Dimensions.get('window').width / 2.4}
              alignItems={'center'}
              justifyContent={'center'}>
              <Image
                source={{
                  uri: item?.images?.length
                    ? item.images[0]
                    : 'https://boltagency.ca/content/images/2020/03/placeholder-images-product-1_large.png',
                }}
                style={styles.specialImg}
                alt={'image'}
                resizeMode={'contain'}
              />
            </Box>

            <Box pl={2}>
              <Text noOfLines={1}>{item?.title}</Text>
              <HStack space={3}>
                <Text>&#8377; {item?.salePrice}</Text>
                <Text
                  textDecorationLine={'line-through'}
                  color={COLORS.primary}>
                  &#8377; {item?.mrp}
                </Text>
              </HStack>
            </Box>

            <Box
              width={8}
              position={'absolute'}
              bg={'COLORS.secondary'}
              borderTopLeftRadius={5}
              alignItems={'center'}
              borderBottomRightRadius={5}>
              <Text fontSize={10} flexWrap={'wrap'} color={COLORS.textWhite}>
                {(((item?.mrp - item?.salePrice) / item?.mrp) * 100).toFixed(2)}{' '}
                % OFF
              </Text>
            </Box>
          </Pressable>

          <Box
            alignSelf={'flex-end'}
            right={5}
            bg={COLORS.textWhite}
            mt={-5}
            shadow={1}
            borderRadius={5}
            borderColor={COLORS.lightGrey}>
            {/* {cartItems?.some((data: any) => data?.id === item?.id) && count > 0 ? ( */}
            {isCartItem ? (
              <HStack
                bg={'#FFFF0060'}
                w={'152'}
                justifyContent="space-between"
                alignItems={'center'}>
                <Box>
                  <Entypo
                    name="minus"
                    size={20}
                    color={COLORS.fadeBlack}
                    onPress={() => decrement()}
                  />
                </Box>
                <Box>
                  {/* <Text>{count}</Text> */}
                  <Text>{quantity(item._id)}</Text>
                </Box>
                <Box>
                  <Entypo
                    name="plus"
                    size={18}
                    color={COLORS.fadeBlack}
                    style={{
                      paddingHorizontal: 3,
                      paddingVertical: 3,
                    }}
                    onPress={increment}
                  />
                </Box>
              </HStack>
            ) : (
              <Box>
                <Entypo
                  name="plus"
                  size={18}
                  color={COLORS.fadeBlack}
                  style={{
                    paddingHorizontal: 3,
                    paddingVertical: 3,
                  }}
                  onPress={() => AddSpecialCart(item)}
                />
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default SpecialProductCard;

const styles = StyleSheet.create({
  specialImg: {
    width: 100,
    height: 100,
  },
});
