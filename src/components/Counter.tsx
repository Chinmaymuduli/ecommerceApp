import {StyleSheet} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {Box, HStack, Text} from 'native-base';
import {COLORS} from 'configs';
import Entypo from 'react-native-vector-icons/Entypo';
import {ProductType} from 'types';
import {useStore} from 'app';
import {useIsMounted, useSwrApi} from 'hooks';
import {put, remove} from 'api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  item: ProductType;
  setOpenAlert: (previousValue: boolean) => void;
  setAlertMessage: (txt: string) => void;
};
const Counter = ({item, setAlertMessage, setOpenAlert}: Props) => {
  const {addToCart, updateQuantity, removeFromCart, cartItems} = useStore();
  const isMounted = useIsMounted();

  // console.log('item', item);

  const {data, mutate, isLoading} = useSwrApi('cart/all');
  const CartData = data?.data?.data?.products;

  const Selected_Weight = item?.weightAvailability?.reduce((pV, cV) => {
    if ((cV?.currentPrice || 0) > (pV?.currentPrice || 0)) return cV;
    return pV;
  }, {});

  const [count, setCount] = React.useState(0);

  // console.log('first');

  const isCartItem = useMemo(
    () =>
      CartData?.some((i: {product: {_id: any}}) => i.product._id === item._id),
    [CartData],
  );
  // console.log('isCartItem', isCartItem);
  // console.log({isCartItem});
  // const isCartItem = useMemo(
  //   () => cartItems.some(i => i.product.id === item.id),
  //   [cartItems],
  // );
  const quantity = useCallback(
    (id: number) => {
      const res = CartData?.filter(
        (i: {product: {_id: number}}) => i.product._id === id,
      )?.[0];
      // console.log({res});
      return res.quantity;
    },
    [CartData],
  );
  // const quantity = useCallback(
  //   (id: number) => {
  //     const res = cartItems.filter(i => i.product.id === id)?.[0];
  //     return res.quantity;
  //   },
  //   [cartItems],
  // );

  //   console.log({isCartItem, item});

  const increment = async (id: number) => {
    try {
      console.log('loading');

      const res = await put({
        path: 'cart/add',
        body: JSON.stringify({
          product: id,
          quantity: 1,
        }),
      });
      // mutate()
      if (res.status === 200) return mutate();

      isMounted.current && setCount(10);
      // console.log('Updated', res.status);
    } catch (error) {
      console.log(error);
    }
  };

  const decrement = async (id: number) => {
    console.log('object200', id);
    try {
      // if (count === 1) {
      //   setCount(count - 1);
      //   // removeFromCart(id);
      //   await remove({
      //     path: `cart/${id}`,
      //   });
      //   setOpenAlert(true);
      //   setAlertMessage('Removed from cart');
      //   setTimeout(() => {
      //     setOpenAlert(false);
      //   }, 2000);
      //   return;
      // } else if (count > 1) {
      //   isMounted.current && setCount(count - 1);
      // updateQuantity(id, count);

      const res = await put({
        path: 'cart/remove',
        body: JSON.stringify({
          product: id,
          quantity: -1,
        }),
      });
      console.log({res});
      if (res.status === 200) return mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const addtoCartItem = async () => {
    try {
      increment(item?._id), setCount(count + 1);
      await put({
        path: 'cart/add',

        body: JSON.stringify({
          product: item?._id,
          quantity: 1,
        }),
      });

      setOpenAlert(true),
        setAlertMessage('Added to cart'),
        setTimeout(() => {
          setOpenAlert(false);
        }, 4000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      alignSelf={'flex-end'}
      right={2}
      bg={COLORS.textWhite}
      mt={-5}
      shadow={1}
      borderRadius={5}
      borderColor={COLORS.lightGrey}>
      {isCartItem ? (
        <HStack
          bg={'#FFFF0060'}
          w={'125'}
          justifyContent="space-between"
          alignItems={'center'}>
          <Box>
            <Entypo
              name="minus"
              size={20}
              color={COLORS.fadeBlack}
              onPress={() => decrement(item._id)}
            />
          </Box>

          <Box>
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
              onPress={() => increment(item._id)}
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
            onPress={() => addtoCartItem()}
          />
        </Box>
      )}
    </Box>
  );
};

export default Counter;

const styles = StyleSheet.create({});
