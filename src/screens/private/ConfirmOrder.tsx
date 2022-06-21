import {StyleSheet} from 'react-native';
import React from 'react';
import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {COLORS} from 'configs';
import {CONFIRM} from 'assets';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';
import moment from 'moment';

type Props = NativeStackScreenProps<PrivateRoutesType, 'ConfirmOrder'>;
const ConfirmOrder = ({route, navigation}: Props) => {
  // console.log('data', route.params);
  const saving = route.params?.discount - route.params?.price;
  const DiscountPrice = route?.params?.discount;
  const discountCoupon = route?.params?.discountCoupon;
  const AmoutPayable = DiscountPrice - (saving + discountCoupon);
  return (
    <Box flex={1} bg={COLORS.textWhite}>
      <ScrollView>
        <Center mb={3}>
          <Image
            alt="confirmpic"
            // h={200}
            source={CONFIRM}
            style={{width: 300, height: 260}}
            resizeMode={'contain'}
          />
          <Heading size={'md'}>Thank you for your order !</Heading>
          <Text mt={2} textAlign={'center'}>
            Your order has been placed successfully. your ID is #
            {route.params?.orderId}
          </Text>
        </Center>
        <Box px={4}>
          <Box borderTopWidth={1} borderColor={COLORS.lightGrey}>
            <HStack justifyContent={'space-between'} mt={3}>
              <HStack space={2}>
                <Box bg={COLORS.cgcolor} borderRadius={5}>
                  <AntDesign
                    name="calendar"
                    size={20}
                    color={COLORS.textWhite}
                    style={{padding: 9}}
                  />
                </Box>
                <VStack>
                  <Text bold fontSize={12}>
                    Order Date
                  </Text>
                  <Text fontSize={11}>{moment(new Date()).format('llll')}</Text>
                </VStack>
              </HStack>
              <HStack space={2}>
                <Box bg={COLORS.cgcolor} borderRadius={5}>
                  <AntDesign
                    name="calendar"
                    size={20}
                    color={COLORS.textWhite}
                    style={{padding: 9}}
                  />
                </Box>
                <VStack>
                  <Text bold fontSize={12}>
                    Order ID
                  </Text>
                  <Text fontSize={11}>#{route.params?.orderId}</Text>
                </VStack>
              </HStack>
            </HStack>
          </Box>
          <Box bg={'#EDF2F3'} mt={4} borderRadius={6}>
            <Box px={3} py={3}>
              <Heading size={'sm'}>Order Details</Heading>
              <Box
                borderBottomWidth={1}
                borderColor={COLORS.lightGrey}
                borderBottomStyle={'dashed'}>
                <HStack
                  pt={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Text>Price(1 items)</Text>
                  <Text>&#8377;{route.params?.discount}</Text>
                </HStack>

                <HStack
                  pt={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Text>Saving</Text>
                  <Text color={'green.500'}>- &#8377;{saving}</Text>
                </HStack>
                <HStack
                  pt={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Text>Coupon Discount</Text>
                  <Text color={'green.500'}>
                    - &#8377;{route.params?.discountCoupon}
                  </Text>
                </HStack>
                <HStack
                  mb={2}
                  pt={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Text>Delivery Charges</Text>
                  <Text color={'green.500'}>free</Text>
                </HStack>
              </Box>
              <HStack
                justifyContent={'space-between'}
                alignItems={'center'}
                mt={2}>
                <Text>Amount Payable</Text>
                <Text bold>&#8377;{AmoutPayable}</Text>
              </HStack>
            </Box>
          </Box>
          {/* Order Details */}

          <Pressable
            alignItems={'center'}
            mt={3}
            onPress={() => navigation.navigate('Order')}>
            <Text bold color={COLORS.cgcolor}>
              See Order Details
            </Text>
          </Pressable>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({});
