import {StyleSheet} from 'react-native';
import React from 'react';
import {
  Box,
  Collapse,
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
import {Rating} from 'react-native-ratings';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';

type Props = NativeStackScreenProps<PrivateRoutesType, 'OrderSummary'>;
const OrderSummary = ({navigation, route}: Props) => {
  // console.log('object', route.params);
  const [ratings, setRatings] = React.useState(3);
  const [count, setCount] = React.useState(1);
  const decreaseItem = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      setCount(1);
    }
  };
  return (
    <Box flex={1} bg={COLORS.textWhite}>
      <ScrollView>
        <Box
          px={5}
          mt={5}
          borderBottomWidth={10}
          borderColor={COLORS.lightGrey}>
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <Heading size={'sm'}>Deliver to:</Heading>
            <Pressable onPress={() => navigation.navigate('SelectAddress')}>
              <Box
                borderWidth={1}
                borderColor={COLORS.cgcolor}
                borderRadius={5}>
                <Text color={COLORS.cgcolor} bold px={3} py={1}>
                  Change
                </Text>
              </Box>
            </Pressable>
          </HStack>
          <VStack mt={2} space={1} pb={4}>
            <Text bold>John Deo</Text>
            <Text fontSize={13}>
              Akshya Nagar 1st Block 1st Cross, Rammurthy nagar,
              Bangalore-560016
            </Text>
            <Text>1234567890</Text>
          </VStack>
        </Box>
        <Box
          px={4}
          //   mt={2}
          borderBottomWidth={10}
          borderColor={COLORS.lightGrey}>
          <Box pb={5} pt={5}>
            <HStack>
              <VStack alignItems={'center'}>
                <Image
                  alt="orderimg"
                  source={route.params?.img}
                  //   bg={COLORS.lightGrey}
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
                      <Text bold>{count}</Text>
                    </Box>
                    <Box bg={'green.600'} borderRadius={15}>
                      <AntDesign
                        style={{
                          padding: 2,
                        }}
                        name="plus"
                        size={20}
                        color={COLORS.textWhite}
                        onPress={() => setCount(count + 1)}
                      />
                    </Box>
                  </HStack>
                </Box>
              </VStack>
              <VStack pl={5}>
                <Text bold fontSize={16}>
                  {route.params?.label}
                </Text>
                <Text mt={1}>400ml</Text>
                <HStack>
                  <Rating
                    type="custom"
                    startingValue={ratings}
                    ratingColor={'green'}
                    tintColor={'#fff'}
                    ratingBackgroundColor={COLORS.grey}
                    ratingCount={5}
                    imageSize={17}
                    onFinishRating={(rating: React.SetStateAction<number>) => {
                      setRatings(rating);
                    }}
                    style={{paddingVertical: 10}}
                  />
                </HStack>
                <HStack space={3}>
                  <Text bold fontSize={16}>
                    ₹{route.params?.price}
                  </Text>
                  <Text textDecorationLine={'line-through'} fontSize={16}>
                    ₹{route.params?.discount}
                  </Text>
                  <Text color={'green.600'} bold fontSize={16}>
                    {route.params?.offer}
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
        <Box>
          <Box py={4}>
            <Heading size={'sm'} px={4}>
              Price Details
            </Heading>
            <Box px={4}>
              <VStack
                space={2}
                pt={5}
                borderBottomWidth={1}
                pb={3}
                borderStyle={'dashed'}>
                <HStack justifyContent={'space-between'}>
                  <Text>Price</Text>
                  <Text>&#8377;{route.params?.discount}</Text>
                </HStack>
                <HStack justifyContent={'space-between'}>
                  <Text>Discount</Text>
                  <Text color={'green.600'}>
                    - &#8377;{route?.params?.discount - route?.params?.price}
                  </Text>
                </HStack>
                <HStack justifyContent={'space-between'}>
                  <Text>Delivery Charges</Text>
                  <Text color={'green.600'}>Free</Text>
                </HStack>
              </VStack>
            </Box>
            <Box borderBottomWidth={1} borderColor={COLORS.lightGrey}>
              <HStack px={4} justifyContent={'space-between'} py={3}>
                <Text bold>Total Amount</Text>
                <Text bold>
                  &#8377;{' '}
                  {route?.params?.discount -
                    (route?.params?.discount - route?.params?.price)}
                </Text>
              </HStack>
            </Box>
            <Box px={4} py={2}>
              <Text color={'green.600'}>
                You will save &#8377;
                {route?.params?.discount - route?.params?.price} on this order
              </Text>
            </Box>
          </Box>
        </Box>
        {/* Proceed to pay */}
      </ScrollView>
      <Box w={'full'} position={'absolute'} bottom={1}>
        <Pressable
          mx={4}
          bg={'#008000'}
          borderRadius={4}
          onPress={() => navigation.navigate('PaymentScreen', route.params)}>
          <HStack justifyContent={'space-between'} py={2} alignItems={'center'}>
            <HStack alignItems={'center'} space={2} pl={2}>
              <Box>
                <Text bold color={'#fff'}>
                  1 items
                </Text>
              </Box>
              <HStack space={2}>
                <Text bold color={'#fff'}>
                  |
                </Text>
                <Text bold color={'#fff'}>
                  &#8377;{route.params?.price}
                </Text>
                <Text textDecorationLine={'line-through'} color={'#fff'}>
                  &#8377; {route.params?.discount}
                </Text>
              </HStack>
            </HStack>
            <HStack space={2} alignItems={'center'}>
              <Text bold color={'#fff'}>
                Proceed to pay
              </Text>
              <Ionicons name="chevron-forward" size={25} color={'#fff'} />
            </HStack>
          </HStack>
        </Pressable>
      </Box>
    </Box>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({});
