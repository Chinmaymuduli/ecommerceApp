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

const ConfirmOrder = () => {
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
            Your order has been placed successfully. your ID is #51236445
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
                  <Text fontSize={11}>Sun, 14 Apr, 19:12</Text>
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
                  <Text fontSize={11}>#253445512</Text>
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
                  <Text>Price(2 items)</Text>
                  <Text>&#8377;344</Text>
                </HStack>

                <HStack
                  pt={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Text>Saving</Text>
                  <Text color={'green.500'}>- &#8377;100</Text>
                </HStack>
                <HStack
                  pt={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Text>Coupon Discount</Text>
                  <Text color={'green.500'}>- &#8377;0</Text>
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
                <Text bold>&#8377;244</Text>
              </HStack>
            </Box>
          </Box>
          {/* Order Details */}
          {/* <Box bg={COLORS.cgcolor} mt={4} mb={2}>
            <Pressable alignItems={'center'}>
              <Text color={COLORS.textWhite} py={2}>
                Order Details
              </Text>
            </Pressable>
          </Box> */}
          <Pressable alignItems={'center'} mt={3}>
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
