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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AYUSH_1, AYUSH_2, CART} from 'assets';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {CartItem, Empty} from 'components/core';
const CartArr = [
  {
    id: 1,
    label: 'Mahua Laddu',
    discount: 300,
    img: AYUSH_1,
    price: 250,
    offer: '20% OFF',
    quantity: 1,
  },
  {
    id: 2,
    label: 'Jyotishmati Oil',
    discount: 599,
    img: AYUSH_2,
    price: 499,
    offer: '20% OFF',
    quantity: 1,
  },
];

const Cart = () => {
  const navigation = useNavigation<NavigationProps>();
  const [count, setCount] = React.useState(1);
  const [quantity, setQuantity] = React.useState(CartArr);
  // console.log('first', quantity);
  return (
    <Box flex={1} bg={COLORS.textWhite}>
      <HStack alignItems={'center'} space={4} px={3} py={2}>
        <Ionicons name="arrow-back" size={30} color={COLORS.fadeBlack} />
        <Heading size={'sm'} color={'#000'}>
          My Cart
        </Heading>
      </HStack>
      {CartArr.length > 0 ? (
        <ScrollView>
          <Box>
            <HStack
              justifyContent={'space-between'}
              px={3}
              bg={'#e4e4e460'}
              py={3}>
              <Text fontSize={13}>shipment 1 of 1</Text>
              <Text fontSize={13}>2 items</Text>
            </HStack>

            <Box>
              {quantity?.map((item, index) => (
                <CartItem item={item} key={index} setQuantity={setQuantity} />
              ))}
            </Box>
            {/* <Pressable
              bg={'#e4e4e460'}
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
            </Pressable> */}
            <Box px={4} py={4} borderBottomWidth={6} borderColor={'#e4e4e460'}>
              <Heading size={'sm'}>Bill details</Heading>
              <VStack space={1} py={3}>
                <HStack alignItems={'center'} justifyContent={'space-between'}>
                  <Text fontSize={12} bold>
                    MRP
                  </Text>
                  <Text>
                    &#8377;{' '}
                    {quantity?.reduce(
                      (acc, item) => acc + item.discount * item.quantity,
                      0,
                    )}
                  </Text>
                </HStack>
                <HStack alignItems={'center'} justifyContent={'space-between'}>
                  <Text fontSize={12} bold>
                    Product discount
                  </Text>
                  <Text color={'green.500'}>
                    - &#8377;
                    {quantity?.reduce(
                      (acc, item) =>
                        acc + (item?.discount - item.price) * item.quantity,
                      0,
                    )}
                  </Text>
                </HStack>
                <HStack alignItems={'center'} justifyContent={'space-between'}>
                  <Text fontSize={12} bold>
                    Delivery charges
                  </Text>
                  <Text color={'green.500'}>free</Text>
                </HStack>
              </VStack>
              <HStack
                alignItems={'center'}
                justifyContent={'space-between'}
                mt={1}>
                <Heading size={'sm'}>Bill total</Heading>
                <Text bold>
                  &#8377;{' '}
                  {quantity?.reduce(
                    (acc, item) =>
                      acc +
                      item.discount * item.quantity -
                      (item?.discount - item.price) * item.quantity,
                    0,
                  )}
                </Text>
              </HStack>
            </Box>
            <Box pb={40} px={3}>
              <Pressable
                bg={'#008000'}
                borderRadius={4}
                mt={2}
                onPress={() => navigation.navigate('Address')}>
                <HStack justifyContent={'space-between'} py={2}>
                  <HStack alignItems={'center'} space={2} pl={2}>
                    <Box>
                      <Text bold color={'#fff'}>
                        {quantity?.length} items
                      </Text>
                    </Box>
                    <HStack space={2}>
                      <Text bold color={'#fff'}>
                        |
                      </Text>
                      <Text bold color={'#fff'}>
                        &#8377;{' '}
                        {quantity?.reduce(
                          (acc, item) =>
                            acc +
                            item.discount * item.quantity -
                            (item?.discount - item.price) * item.quantity,
                          0,
                        )}
                      </Text>
                      <Text textDecorationLine={'line-through'} color={'#fff'}>
                        &#8377;
                        {quantity?.reduce(
                          (acc, item) =>
                            acc + (item?.discount - item.price) * item.quantity,
                          0,
                        )}
                      </Text>
                    </HStack>
                  </HStack>
                  <HStack space={2} alignItems={'center'}>
                    <Text bold color={'#fff'}>
                      Proceed
                    </Text>
                    <Ionicons name="chevron-forward" size={25} color={'#fff'} />
                  </HStack>
                </HStack>
              </Pressable>
            </Box>
          </Box>
        </ScrollView>
      ) : (
        <Box>
          <Empty animation={CART} title="No items found" h={400} />
        </Box>
      )}
    </Box>
  );
};

export default Cart;

const styles = StyleSheet.create({});
