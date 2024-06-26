import React from 'react';
import {Box, HStack, Image, Text, VStack} from 'native-base';
import {COLORS} from 'configs';
import {Rating} from 'react-native-ratings';
import {CartItemType} from 'types';
import {PRODUCT_PLACEHOLDER} from 'assets';

type Props = {
  orderData: CartItemType;
};

const OrderSummaryCard = ({orderData}: Props) => {
  const review =
    orderData?.product?.reviews?.stars === 0
      ? 0
      : orderData?.product?.reviews?.stars / orderData?.product?.reviews?.total;
  return (
    <Box px={4} borderBottomWidth={10} borderColor={COLORS.lightGrey}>
      <Box pb={5} pt={5}>
        <HStack>
          <VStack alignItems={'center'}>
            <Image
              alt="orderimg"
              source={
                orderData?.product?.displayImage?.url
                  ? {uri: orderData?.product?.displayImage?.url}
                  : PRODUCT_PLACEHOLDER
              }
              resizeMode={'contain'}
              style={{
                width: 100,
                height: 100,
              }}
            />
          </VStack>
          <VStack pl={5}>
            <Text bold fontSize={16}>
              {orderData?.product?.title}
            </Text>
            <Text mt={1}>
              {orderData?.product?.measureUnit}{' '}
              {orderData?.product?.measureType} x {orderData?.quantity}
            </Text>
            <HStack>
              <Rating
                type="custom"
                startingValue={review}
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
                ₹ {orderData?.product?.mrp}
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
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default OrderSummaryCard;
