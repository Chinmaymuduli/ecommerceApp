import {StyleSheet} from 'react-native';
import React from 'react';
import {
  Box,
  Heading,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {COLORS} from 'configs';
import {AYUSH_1} from 'assets';
import {Track} from 'components/core';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

const OrderDetails = () => {
  return (
    <Box flex={1} bg={COLORS.textWhite}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box>
          <Box
            borderBottomWidth={1}
            px={5}
            borderBottomColor={COLORS.lightGrey}>
            <Text letterSpacing={1} color={'gray.500'} py={3}>
              Order ID - CH
              {Math.floor(Math.random() * (999999 - 100000) + 10000000)}
            </Text>
          </Box>
          <Box borderBottomWidth={3} borderColor={COLORS.lightGrey}>
            <HStack px={5} pt={5}>
              <VStack space={1} w={'70%'}>
                <Heading size={'sm'} flexWrap={'wrap'}>
                  Jyotishmati Oil
                </Heading>
                <Text color={'gray.500'}>3 Items</Text>
                <Text color={'gray.500'}>Seller : Chhatisgarh Herbals</Text>
                <Text bold fontSize={16}>
                  &#8377; 599
                </Text>
              </VStack>
              <Box w={'30%'}>
                <Image
                  source={AYUSH_1}
                  style={styles.image}
                  alt={'detailsImg'}
                  resizeMode="contain"
                  bg={'green.50'}
                  borderRadius={4}
                />
              </Box>
            </HStack>
            <Pressable
              borderWidth={1}
              alignSelf={'flex-start'}
              mx={4}
              borderColor={'red.400'}
              borderRadius={5}
              my={3}>
              <Text px={3} py={1} bold color={'red.400'}>
                Cancel Order
              </Text>
            </Pressable>
          </Box>
          <Box borderBottomWidth={3} borderColor={COLORS.lightGrey}>
            <Track />
          </Box>
          <Pressable>
            <HStack
              justifyContent={'space-between'}
              py={4}
              px={5}
              borderColor={COLORS.lightGrey}
              borderBottomWidth={3}>
              <HStack space={3}>
                <FontAwesome
                  name="file-text"
                  size={20}
                  color={COLORS.primary}
                />
                <Text bold>Invoice Download</Text>
              </HStack>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.fadeBlack}
              />
            </HStack>
          </Pressable>

          <Box borderBottomWidth={1} borderColor={COLORS.lightGrey} px={5}>
            <Text py={3} color={'gray.400'} bold>
              Shipping Details
            </Text>
          </Box>
          <Box
            px={5}
            pb={3}
            borderBottomWidth={4}
            borderColor={COLORS.lightGrey}>
            <Heading size={'sm'} py={2}>
              John Deo
            </Heading>
            <Text>Kolathia,Bhubaneswar</Text>
            <Text>Khurda District</Text>
            <Text>Odisha - 756041</Text>
            <Text>Phone number: 1234567895</Text>
          </Box>
          <Box borderBottomWidth={1} borderColor={COLORS.lightGrey}>
            <Box borderBottomWidth={1} borderColor={COLORS.lightGrey} px={5}>
              <Text py={3} color={'gray.400'} bold>
                Price Details
              </Text>
            </Box>
            <Box px={5}>
              <VStack
                space={3}
                py={3}
                borderBottomWidth={1}
                borderStyle={'dashed'}>
                <HStack justifyContent={'space-between'}>
                  <Text>List Price</Text>
                  <Text textDecorationLine={'line-through'}>&#8377;899</Text>
                </HStack>
                <HStack justifyContent={'space-between'}>
                  <Text>Selling Price</Text>
                  <Text>&#8377;599</Text>
                </HStack>
                <HStack justifyContent={'space-between'}>
                  <Text>Discount</Text>
                  <Text>- &#8377;0</Text>
                </HStack>
                <HStack justifyContent={'space-between'}>
                  <Text>Shipping Fee</Text>
                  <Text color={'green.500'}>free</Text>
                </HStack>
              </VStack>
            </Box>
            <Box px={5} borderColor={COLORS.lightGrey}>
              <HStack justifyContent={'space-between'} py={2}>
                <Text bold>Total Amount</Text>
                <Text bold>&#8377; 599</Text>
              </HStack>
            </Box>
          </Box>
          <Box px={5}>
            <HStack py={2} space={3}>
              <Octicons name="dot-fill" size={20} color={COLORS.fadeBlack} />
              <HStack alignItems={'center'} space={2}>
                <Text>Online Payment:</Text>
                <Text>&#8377;599</Text>
              </HStack>
            </HStack>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
  },
});
