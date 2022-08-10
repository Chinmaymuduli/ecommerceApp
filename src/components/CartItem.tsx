import {Alert, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  HStack,
  Image,
  VStack,
  Text,
  Pressable,
  AlertDialog,
  Button,
} from 'native-base';
import {COLORS} from 'configs';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CartItemType, CartType} from 'types';
import {useStore} from 'app';
import OrderSummaryCounter from './OrderSummaryCounter';
import {useAuthFetch} from 'hooks';
import {put, remove} from 'api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CartAlert} from './core';
import {PRODUCT_PLACEHOLDER} from 'assets';

type CartItemTypes = {
  item: CartItemType;
  setQuantity?: number | any;
  // handleDelete: (prev: any) => void;
  // isOpen?: boolean;
  // setIsOpen: (prev: boolean) => void;
  // onClose: () => void;
  mutate: () => void;
};

const CartItem = ({
  item,
  setQuantity,
  mutate,
}: // handleDelete,
// onClose,
// setIsOpen,
// isOpen,
CartItemTypes) => {
  const {updateQuantity, cartItems, removeFromCart} = useStore();

  const [deleteId, setDeleteId] = useState();

  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

  const increment = async (item: CartItemType) => {
    const res = await put({
      path: 'cart/add',
      body: JSON.stringify({
        product: item.product._id,
        quantity: 1,
      }),
    });
    // console.log('objectRes', res);
  };

  const decrement = (item: CartItemType) => {
    updateQuantity(item?.product?.id, item?.quantity - 1);
    if (item?.quantity < 2) {
      removeFromCart(item?.product?.id);
    }
  };

  const handleAlert = (id: any) => {
    console.log({id});
    setIsOpen(!isOpen);
    setDeleteId(id);
  };

  return (
    <Box
      px={3}
      // py={1}
      borderBottomWidth={1}
      borderBottomColor={COLORS.lightGrey}>
      <HStack py={3}>
        <Box alignItems={'center'} justifyContent={'center'}>
          <Image
            alt="cartImg"
            // source={item?.product?.img}
            source={
              item?.displayImage?.url
                ? {
                    uri: item?.displayImage?.url,
                  }
                : PRODUCT_PLACEHOLDER
            }
            style={{height: 110, width: 100}}
            resizeMode="contain"
          />
        </Box>
        <VStack px={3} space={3}>
          <HStack space={20}>
            <Text w={100} noOfLines={2}>
              {item?.product?.title}
            </Text>
            <MaterialIcons
              name="delete"
              size={25}
              color={COLORS.danger}
              // onPress={() => setIsOpen(!isOpen)}

              onPress={() => handleAlert(item._id)}
            />
          </HStack>
          <HStack space={2}>
            <Text color={'#000'} bold>
              {/* &#8377;{item?.weight?.currentPrice} */}
              &#8377;{item?.product.salePrice}
            </Text>
            <Text textDecorationLine={'line-through'}>
              {/* &#8377;{(item?.weight?.currentPrice || 0) + 100} */}
              &#8377;{item?.product?.mrp || 0}
            </Text>
          </HStack>
          {/* <Text>{item.weight?.weight}</Text> */}
          <Text>
            {item.product?.measureUnit}
            {item.product?.measureType}
          </Text>
        </VStack>
        <Box bg={COLORS.primary} position={'absolute'} top={1} borderRadius={6}>
          <Text color={COLORS.textWhite} fontSize={8} px={1}>
            {/* {item?.weight?.discount} % OFF */}
            {(
              ((item?.product.mrp - item?.product.salePrice) /
                item?.product.mrp) *
              100
            ).toFixed(1)}{' '}
            % OFF
          </Text>
        </Box>
        <Box
          bg={'yellow.400'}
          position={'absolute'}
          borderRadius={3}
          bottom={6}
          right={2}>
          <HStack alignItems={'center'} px={1} space={3}>
            <Pressable onPress={() => decrement(item)}>
              <Entypo name="minus" size={18} color={COLORS.fadeBlack} />
            </Pressable>
            <Box>
              <Text bold color={COLORS.fadeBlack}>
                {item?.quantity}
              </Text>
            </Box>
            <Pressable py={1} onPress={() => increment(item)}>
              <Entypo name="plus" size={18} color={COLORS.fadeBlack} />
            </Pressable>
          </HStack>
        </Box>
      </HStack>
      {/* <OrderSummaryCounter
        orderQuantity={item?.quantity}
        productID={item?.product.id}
      /> */}

      <CartAlert
        onClose={onClose}
        isOpen={isOpen}
        id={deleteId}
        mutate={mutate}
      />
    </Box>
  );
};

export default CartItem;

const styles = StyleSheet.create({});
