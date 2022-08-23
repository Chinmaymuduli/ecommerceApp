import {ActivityIndicator, StyleSheet} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {Box, HStack, Text} from 'native-base';
import {COLORS} from 'configs';
import Entypo from 'react-native-vector-icons/Entypo';
import {ProductType} from 'types';
import {useStore} from 'app';
import {useIsMounted, useSwrApi} from 'hooks';
import {put, remove} from 'api';

type Props = {
  item: ProductType;
  setOpenAlert: (previousValue: boolean) => void;
  setAlertMessage: (txt: string) => void;
  ProductMutate: () => void;
};
const Counter = ({
  item,
  setAlertMessage,
  setOpenAlert,
  ProductMutate,
}: // ProductMutate,
Props) => {
  const [loader, setLoader] = useState(false);
  const isMounted = useIsMounted();
  const increment = async (id: number) => {
    try {
      isMounted.current && setLoader(true);
      const res = await put({
        path: 'cart/add',
        body: JSON.stringify({
          product: id,
          quantity: 1,
        }),
      });

      if (res.status === 200) return ProductMutate();
    } catch (error) {
      console.log(error);
    } finally {
      isMounted.current && setLoader(false);
    }
  };

  const decrement = async (id: number) => {
    try {
      isMounted.current && setLoader(true);
      const res = await put({
        path: 'cart/remove',
        body: JSON.stringify({
          product: id,
          quantity: -1,
        }),
      });
      if (res.status === 200) return ProductMutate();
    } catch (error) {
      console.log(error);
    } finally {
      ProductMutate();
      isMounted.current && setLoader(false);
    }
  };

  const addToCartItem = async () => {
    try {
      isMounted.current && setLoader(true);
      const response = await put({
        path: 'cart/add',

        body: JSON.stringify({
          product: item?._id,
          quantity: 1,
        }),
      });
      console.log({response});
      setOpenAlert(true),
        setAlertMessage('Added to cart'),
        setTimeout(() => {
          setOpenAlert(false);
        }, 4000);
      // if (response.status === 200) return mutate();
    } catch (error) {
      console.log(error);
    } finally {
      ProductMutate();
      isMounted.current && setLoader(false);
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
      {item.isInCart ? (
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
            {loader ? (
              <ActivityIndicator size={'small'} />
            ) : (
              <Text>{item?.cartQuantity}</Text>
            )}
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
            onPress={() => addToCartItem()}
          />
        </Box>
      )}
    </Box>
  );
};

export default Counter;

const styles = StyleSheet.create({});
