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
import {getPrice} from 'utils';

type Props = NativeStackScreenProps<PrivateRoutesType, 'ConfirmOrder'>;
const ConfirmOrder = ({route: {params}, navigation}: Props) => {
  // const confirmData = route.params?.confirmOrderData;

  // const {
  //   TotalProductPriceWithoutDiscount,
  //   sumTotalPriceCustomerWillPay,
  //   totalDiscountAmount,
  // } = getPrice(confirmData);
  console.log({params});
  return (
    <Box flex={1} bg={COLORS.textWhite}>
      <ScrollView>
        <Center mb={3}>
          <Image
            alt="confirm_pic"
            source={CONFIRM}
            style={{width: 300, height: 260}}
            resizeMode={'contain'}
          />
          <Heading size={'md'}>Thank you for your order !</Heading>
          <Text mt={2} textAlign={'center'}>
            Your order has been placed successfully.
          </Text>
        </Center>
        <Box px={4}>
          <Box borderTopWidth={1} borderColor={COLORS.lightGrey}>
            <HStack justifyContent={'space-between'} mt={3}>
              <HStack space={2}>
                <Box bg={COLORS.primary} borderRadius={5}>
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
                  <Text fontSize={11}>{moment(new Date()).format('LL')}</Text>
                </VStack>
              </HStack>
              <HStack space={2}>
                <Box bg={COLORS.primary} borderRadius={5}>
                  <AntDesign
                    name="calendar"
                    size={20}
                    color={COLORS.textWhite}
                    style={{padding: 9}}
                  />
                </Box>
                <VStack>
                  <Text bold fontSize={12}>
                    Order Time
                  </Text>
                  <Text fontSize={11}>{moment(new Date()).format('LTS')}</Text>
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
                  <Text>Price</Text>
                  <Text>&#8377; {params?.totalMrp}</Text>
                </HStack>

                <HStack
                  pt={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Text>Saving</Text>
                  <Text color={'green.500'}>
                    {' '}
                    &#8377; {params?.discount?.toFixed(2)}
                  </Text>
                </HStack>
                <HStack
                  pt={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Text>Coupon Discount</Text>
                  <Text color={'green.500'}>
                    - &#8377;{' '}
                    {params?.couponDiscount
                      ? params?.couponDiscount.toFixed(2)
                      : 0}
                  </Text>
                </HStack>
                <HStack
                  mb={2}
                  pt={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Text>Delivery Charges</Text>
                  <Text color={'green.500'}>
                    +{' '}
                    {params?.deliveryCharges ? params?.deliveryCharges : 'free'}
                  </Text>
                </HStack>
              </Box>
              <HStack
                justifyContent={'space-between'}
                alignItems={'center'}
                mt={2}>
                <Text>Amount Payable</Text>
                <Text bold>&#8377;{params?.totalSalePrice}</Text>
              </HStack>
            </Box>
          </Box>

          <Pressable
            alignItems={'center'}
            mt={3}
            onPress={() => navigation.navigate('Order')}>
            <Text bold color={COLORS.primary}>
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
