import React from 'react';
import {Box, HStack, Image, Text, VStack} from 'native-base';
import {COLORS} from 'configs';
import {Rating} from 'react-native-ratings';
import {CartItemType} from 'types';
import OrderSummaryCounter from './OrderSummaryCounter';

type Props = {
  orderData: CartItemType;
};

const OrderSummaryCard = ({orderData}: Props) => {
  // console.log(orderData);
  return (
    <Box px={4} borderBottomWidth={10} borderColor={COLORS.lightGrey}>
      <Box pb={5} pt={5}>
        <HStack>
          <VStack alignItems={'center'}>
            <Image
              alt="orderimg"
              source={{
                uri: 'https://cdn.shopify.com/s/files/1/0064/8907/9893/products/herbal-tea.jpg?v=1551108498',
              }}
              // source={orderData?.product?.img}
              resizeMode={'contain'}
              style={{
                width: 100,
                height: 100,
              }}
            />
            {/* Counter start */}
            <OrderSummaryCounter
              orderQuantity={orderData?.quantity}
              productID={orderData?.product?.id}
            />
            {/* Counter End */}
          </VStack>
          <VStack pl={5}>
            <Text bold fontSize={16}>
              {orderData?.product?.title}
            </Text>
            <Text mt={1}>
              {orderData?.product?.measureUnit}{' '}
              {orderData?.product?.measureType}
            </Text>
            <HStack>
              <Rating
                type="custom"
                startingValue={4}
                // startingValue={
                //   orderData?.reviews?.stars ? orderData?.reviews?.stars : 2
                // }
                ratingColor={'green'}
                tintColor={'#fff'}
                ratingBackgroundColor={COLORS.grey}
                ratingCount={5}
                imageSize={17}
                readonly={true}
                style={{paddingVertical: 10}}
              />
            </HStack>
            <HStack space={3}>
              <Text bold fontSize={16}>
                ₹{orderData?.product?.salePrice}
                {/* ₹{orderData?.weight?.currentPrice} */}
              </Text>
              <Text textDecorationLine={'line-through'} fontSize={16}>
                ₹{' '}
                {/* {
                  +(
                    ((orderData?.weight?.currentPrice || 0) * 100) /
                    (100 - (orderData?.weight?.discount || 0))
                  ).toFixed(2)
                } */}
                {orderData?.product?.mrp}
              </Text>
              <Text color={'green.600'} bold fontSize={16}>
                {(
                  ((orderData?.product?.mrp - orderData?.product?.salePrice) /
                    orderData?.product?.mrp) *
                  100
                ).toFixed(2)}
                % off
              </Text>
            </HStack>
            <HStack mt={1}>
              <Text>Delivery Charges :</Text>
              <Text color={'green.600'} bold>
                {' '}
                Free
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default OrderSummaryCard;
