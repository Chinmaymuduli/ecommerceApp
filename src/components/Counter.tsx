import {StyleSheet} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {Box, HStack, Text} from 'native-base';
import {COLORS} from 'configs';
import Entypo from 'react-native-vector-icons/Entypo';
import {ProductType} from 'types';
import {useStore} from 'app';
import {useSwrApi} from 'hooks';
import {put, remove} from 'api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  item: ProductType;
  setOpenAlert: (previousValue: boolean) => void;
  setAlertMessage: (txt: string) => void;
};
const Counter = ({item, setAlertMessage, setOpenAlert}: Props) => {
  const {addToCart, updateQuantity, removeFromCart, cartItems} = useStore();

  // console.log('item', item);

  const {data, mutate, isLoading} = useSwrApi('cart/all');
  const CartData = data?.data?.data?.products;

  const Selected_Weight = item?.weightAvailability?.reduce((pV, cV) => {
    if ((cV?.currentPrice || 0) > (pV?.currentPrice || 0)) return cV;
    return pV;
  }, {});

  const [count, setCount] = React.useState(0);

  const isCartItem = useMemo(
    () =>
      CartData?.some((i: {product: {_id: any}}) => i.product._id === item._id),
    [CartData],
  );
  // const isCartItem = useMemo(
  //   () => cartItems.some(i => i.product.id === item.id),
  //   [cartItems],
  // );
  const quantity = useCallback(
    (id: number) => {
      const res = CartData?.filter(
        (i: {product: {_id: number}}) => i.product._id === id,
      )?.[0];
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
      // updateQuantity(id, count);
      const accessToken = await AsyncStorage.getItem('access_token');
      const res = await put({
        path: 'cart/add',
        body: JSON.stringify({
          product: id,
          quantity: 10,
        }),
        // token: accessToken,
      });
      setCount(10);
      console.log('Updated', res);
    } catch (error) {
      console.log(error);
    } finally {
      mutate();
    }
  };

  const decrement = async (id: number) => {
    try {
      const getAccessToken = await AsyncStorage.getItem('access_token');
      if (count === 1) {
        setCount(count - 1);
        // removeFromCart(id);
        await remove({
          path: `cart/${id}`,
          token: getAccessToken,
        });
        setOpenAlert(true);
        setAlertMessage('Removed from cart');
        setTimeout(() => {
          setOpenAlert(false);
        }, 2000);
        return;
      } else if (count > 1) {
        setCount(count - 1);
        // updateQuantity(id, count);

        await put({
          path: 'cart/add',
          body: JSON.stringify({
            product: id,
            quantity: count,
          }),
          token: getAccessToken,
        });
      } else {
        setCount(0);
      }
    } catch (error) {
      console.log(error);
    } finally {
      mutate();
    }
  };

  const addtoCartItem = async () => {
    try {
      increment(item?._id), setCount(count + 1);
      const getAccessToken = await AsyncStorage.getItem('access_token');
      await put({
        path: 'cart/add',
        token: getAccessToken,
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
    } finally {
      mutate();
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
