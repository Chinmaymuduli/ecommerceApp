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
import {AYUSH_1, AYUSH_2, CART} from 'assets';
import {DrawerActions, useNavigation, useRoute} from '@react-navigation/native';
import {CartItem, Empty} from 'components/core';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
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
type Props = NativeStackScreenProps<PrivateRoutesType, 'Cart'>;
const Cart = ({route, navigation}: Props) => {
  const [quantity, setQuantity] = React.useState(CartArr);
  // const {cartItems, setCartItems} = useAppContext();
  // const [quantity, setQuantity] = React.useState(cartItems);
  // console.log('object369', cartItems);

  return (
    <Box flex={1} bg={COLORS.textWhite}>
      <HStack alignItems={'center'} space={4} px={3} py={2}>
        {route.params?.isBack ? (
          <Ionicons
            name="arrow-back"
            size={30}
            color={COLORS.fadeBlack}
            onPress={() => navigation.goBack()}
          />
        ) : (
          <Ionicons
            name="menu"
            size={28}
            color={COLORS.fadeBlack}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        )}
        <Heading size={'sm'} color={'#000'}>
          My Cart
        </Heading>
      </HStack>

      {quantity.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
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
              {quantity?.map((item: any, index: any) => (
                <CartItem item={item} key={index} setQuantity={setQuantity} />
              ))}
            </Box>
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
                      (
                        acc: number,
                        item: {discount: number; quantity: number},
                      ) => acc + item.discount * item.quantity,
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
                      (
                        acc: number,
                        item: {
                          discount: number;
                          price: number;
                          quantity: number;
                        },
                      ) => acc + (item?.discount - item.price) * item.quantity,
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
                    (
                      acc: number,
                      item: {discount: number; quantity: number; price: number},
                    ) =>
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
                onPress={() =>
                  navigation.navigate('OrderSummary', {
                    label: 'Mahua Laddu',
                    price: 250,
                    discount: 300,
                    offer: '20% OFF',
                    img: AYUSH_1,
                  })
                }>
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
                          (
                            acc: number,
                            item: {
                              discount: number;
                              quantity: number;
                              price: number;
                            },
                          ) =>
                            acc +
                            item.discount * item.quantity -
                            (item?.discount - item.price) * item.quantity,
                          0,
                        )}
                      </Text>
                      <Text textDecorationLine={'line-through'} color={'#fff'}>
                        &#8377;
                        {quantity?.reduce(
                          (
                            acc: number,
                            item: {
                              discount: number;
                              price: number;
                              quantity: number;
                            },
                          ) =>
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
