import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Heading,
  HStack,
  Pressable,
  Radio,
  ScrollView,
  Text,
} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS} from 'configs';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';

type Props = NativeStackScreenProps<PrivateRoutesType, 'PaymentScreen'>;
const PaymentScreen = ({navigation, route}: Props) => {
  // console.log('object', route.params);
  const saving = route.params?.discount - route.params?.price;
  const DiscountPrice = route?.params?.discount;
  const [payment, setPayment] = useState<any>();
  const data = {
    label: route?.params?.label,
    discount: route?.params?.discount,
    price: route?.params?.price,
    offer: route?.params?.offer,
    img: route?.params?.img,
    orderId: Math.floor(Math.random() * 10000000000),
    orderDate: new Date().toLocaleDateString(),
    orderTime: new Date().toLocaleTimeString(),
  };
  return (
    <Box flex={1} bg={COLORS.lightGrey}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box bg={COLORS.textWhite} pb={1}>
          <Box mt={5}>
            <Box borderBottomWidth={1} borderColor={COLORS.lightGrey} px={4}>
              <Heading size={'sm'}>Price details</Heading>
            </Box>
            <Box px={4}>
              <Box
                borderBottomWidth={1}
                borderColor={COLORS.lightGrey}
                borderBottomStyle={'dashed'}>
                <HStack
                  pt={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Text>Price(1 items)</Text>
                  <Text>&#8377;{DiscountPrice}</Text>
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
            </Box>
            <Box px={4} mt={2} mb={2}>
              <HStack justifyContent={'space-between'} alignItems={'center'}>
                <Text>Amount Payable</Text>
                <Text bold>&#8377;{DiscountPrice - saving}</Text>
              </HStack>
            </Box>
          </Box>
        </Box>
        <Box>
          <Pressable
            // bg={'#e4e4e460'}
            onPress={() => navigation.navigate('Coupon')}>
            <HStack
              my={2}
              bg={'#fff'}
              px={4}
              alignItems={'center'}
              justifyContent={'space-between'}>
              <HStack alignItems={'center'} py={3} space={4}>
                <MaterialCommunityIcons
                  name="ticket-percent"
                  size={30}
                  color={COLORS.fadeBlack}
                />
                <Text fontSize={15}>Use Coupons</Text>
              </HStack>
              <Ionicons
                name="chevron-forward"
                size={25}
                color={COLORS.fadeBlack}
              />
            </HStack>
          </Pressable>
        </Box>
        <Box bg={COLORS.textWhite} px={4} h={380}>
          <Box py={3}>
            <Heading size={'sm'}>Payment Method</Heading>
          </Box>
          <Box>
            <Radio.Group
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              defaultValue="payOnline"
              value={payment}
              onChange={nextValue => {
                setPayment(nextValue);
              }}>
              <Radio value="payOnline" my={1}>
                Pay Online
              </Radio>
              <Radio value="cod" my={3}>
                Cash On Delivery
              </Radio>
            </Radio.Group>
          </Box>
        </Box>
      </ScrollView>
      <Box w={'full'} position={'absolute'} bottom={1}>
        <Pressable
          mx={4}
          bg={'#008000'}
          borderRadius={4}
          onPress={() => navigation.navigate('ConfirmOrder', data)}>
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
                  &#8377;{DiscountPrice - saving}
                </Text>
                <Text textDecorationLine={'line-through'} color={'#fff'}>
                  &#8377; {DiscountPrice}
                </Text>
              </HStack>
            </HStack>
            <HStack space={2} alignItems={'center'}>
              <Text bold color={'#fff'}>
                Confirm Order
              </Text>
              <Ionicons name="chevron-forward" size={25} color={'#fff'} />
            </HStack>
          </HStack>
        </Pressable>
      </Box>
    </Box>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
