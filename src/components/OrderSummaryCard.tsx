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
  return (
    <Box px={4} borderBottomWidth={10} borderColor={COLORS.lightGrey}>
      <Box pb={5} pt={5}>
        <HStack>
          <VStack alignItems={'center'}>
            <Image
              alt="orderimg"
              source={orderData?.product?.img}
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
              {orderData?.product?.name}
            </Text>
            <Text mt={1}>{orderData?.weight?.weight}</Text>
            <HStack>
              <Rating
                type="custom"
                startingValue={orderData.product.ratings}
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
                ₹{orderData?.weight?.currentPrice}
              </Text>
              <Text textDecorationLine={'line-through'} fontSize={16}>
                ₹{' '}
                {
                  +(
                    ((orderData?.weight?.currentPrice || 0) * 100) /
                    (100 - (orderData?.weight?.discount || 0))
                  ).toFixed(2)
                }
              </Text>
              <Text color={'green.600'} bold fontSize={16}>
                {orderData.weight?.discount}% off
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
