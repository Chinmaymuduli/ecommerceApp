import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Box, HStack, Image, Text, VStack} from 'native-base';
import {COLORS} from 'configs';
import {Rating} from 'react-native-ratings';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CartItemType} from 'types';
import {useStore} from 'app';

type Props = {
  orderData: CartItemType;
};

const OrderSummaryCard = ({orderData}: Props) => {
  const [count, setCount] = React.useState<number>(orderData?.quantity);
  const {updateQuantity} = useStore();
  // console.log('object', orderData);

  const decreaseItem = () => {
    updateQuantity(orderData?.product?.id, orderData?.quantity - 1);
  };
  const increment = () => {
    updateQuantity(orderData?.product?.id, orderData?.quantity + 1);
  };

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
            <Box
              mt={1}
              bg={'#e4e4e460'}
              justifyContent={'center'}
              borderRadius={6}>
              <HStack space={5}>
                <Box bg={'green.600'} borderRadius={15}>
                  <AntDesign
                    name="minus"
                    size={20}
                    color={COLORS.textWhite}
                    style={{
                      padding: 2,
                    }}
                    onPress={() => decreaseItem()}
                  />
                </Box>
                <Box>
                  <Text bold>{orderData?.quantity}</Text>
                </Box>
                <Box bg={'green.600'} borderRadius={15}>
                  <AntDesign
                    style={{
                      padding: 2,
                    }}
                    name="plus"
                    size={20}
                    color={COLORS.textWhite}
                    onPress={() => increment()}
                  />
                </Box>
              </HStack>
            </Box>
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

const styles = StyleSheet.create({});
