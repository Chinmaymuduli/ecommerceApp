import React, {useState} from 'react';
import {Box, HStack, Image, VStack, Text, Pressable} from 'native-base';
import {COLORS} from 'configs';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CartItemType} from 'types';
import {put} from 'api';

import {CartAlert} from './core';
import {PRODUCT_PLACEHOLDER} from 'assets';

type CartItemTypes = {
  item: CartItemType;
  setQuantity?: number | any;
  mutate: () => void;
};

const CartItem = ({item, setQuantity, mutate}: CartItemTypes) => {
  const [deleteId, setDeleteId] = useState();

  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const increment = async (item: CartItemType) => {
    try {
      await put({
        path: 'cart/add',
        body: JSON.stringify({
          product: item.product._id,
          quantity: 1,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      mutate();
    }
  };

  const decrement = async (item: CartItemType) => {
    try {
      await put({
        path: 'cart/remove',
        body: JSON.stringify({
          product: item?.product?._id,
          quantity: -1,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      mutate();
    }
  };

  const handleAlert = (id: any) => {
    setIsOpen(!isOpen);
    setDeleteId(id);
  };

  return (
    <Box px={3} borderBottomWidth={1} borderBottomColor={COLORS.lightGrey}>
      <HStack py={3}>
        <Box alignItems={'center'} justifyContent={'center'}>
          <Image
            alt="cartImg"
            source={
              item?.product?.displayImage
                ? {
                    uri: item?.product?.displayImage?.url,
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
              onPress={() => handleAlert(item._id)}
            />
          </HStack>
          <HStack space={2}>
            <Text color={'#000'} bold>
              &#8377;{item?.product.salePrice}
            </Text>
            <Text textDecorationLine={'line-through'}>
              &#8377;{item?.product?.mrp || 0}
            </Text>
          </HStack>
          <Text>
            {item.product?.measureUnit}
            {item.product?.measureType}
          </Text>
        </VStack>
        <Box bg={COLORS.primary} position={'absolute'} top={1} borderRadius={6}>
          <Text color={COLORS.textWhite} fontSize={8} px={1}>
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
