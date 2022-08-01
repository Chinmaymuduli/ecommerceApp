import {StyleSheet} from 'react-native';
import React from 'react';
import {
  Box,
  Heading,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AYUSH_1, AYUSH_2, CART} from 'assets';
import {DrawerActions} from '@react-navigation/native';
import {Empty} from 'components/core';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CartItemType, CartType, ProductType} from 'types';
import {CartItem} from 'components';
import {useStore} from 'app';
import {getPrice} from 'utils';
import {useAuthFetch} from 'hooks';
const CartArr = [
  {
    id: 1,
    name: 'Mahua Laddu',
    discount: 300,
    img: AYUSH_1,
    currentPrice: 250,
    offer: '20% OFF',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Jyotishmati Oil',
    discount: 599,
    img: AYUSH_2,
    currentPrice: 499,
    offer: '20% OFF',
    quantity: 1,
  },
];
type Props = NativeStackScreenProps<PrivateRoutesType, 'Cart'>;
const Cart = ({route, navigation}: Props) => {
  const {authData} = useAuthFetch<any>({
    path: 'cart/all',
    method: 'GET',
  });

  const [quantity, setQuantity] = React.useState(CartArr);
  const {cartItems, addToOrderItemFromCart} = useStore(state => state);
  // console.log('object', authData?.products);
  const {
    TotalProductPriceWithoutDiscount,
    sumTotalPriceCustomerWillPay,
    totalDiscountAmount,
  } =
    // getPrice(cartItems);
    getPrice(authData?.products);

  const handleProceed = () => {
    addToOrderItemFromCart();
    navigation.navigate(
      'OrderSummary',
      // {
      //   CartItems: cartItems,
      // }
    );
  };

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

      {authData?.products?.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box>
            <HStack
              justifyContent={'space-between'}
              px={3}
              bg={'#e4e4e460'}
              py={3}>
              <Text fontSize={13}>shipment 1 of 1</Text>
              {/* <Text fontSize={13}>{cartItems.length} items</Text> */}
              <Text fontSize={13}>{authData?.products?.length} items</Text>
            </HStack>

            <Box>
              {authData?.products.map((item: CartItemType, index: any) => (
                <>
                  <CartItem item={item} key={index} setQuantity={setQuantity} />
                </>
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
                    &#8377;
                    {TotalProductPriceWithoutDiscount}
                  </Text>
                </HStack>
                <HStack alignItems={'center'} justifyContent={'space-between'}>
                  <Text fontSize={12} bold>
                    Product discount
                  </Text>
                  <Text color={'green.500'}>
                    - &#8377;
                    {totalDiscountAmount}
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
                <Text bold>&#8377; {sumTotalPriceCustomerWillPay}</Text>
              </HStack>
            </Box>
            <Box pb={40} px={3}>
              <Pressable
                bg={COLORS.textSecondary}
                borderRadius={4}
                mt={2}
                onPress={() => handleProceed()}>
                <HStack justifyContent={'space-between'} py={2}>
                  <HStack alignItems={'center'} space={2} pl={2}>
                    <Box>
                      <Text bold color={COLORS.textWhite}>
                        {cartItems?.length} items
                      </Text>
                    </Box>
                    <HStack space={2}>
                      <Text bold color={COLORS.textWhite}>
                        |
                      </Text>
                      <Text bold color={COLORS.textWhite}>
                        &#8377; {sumTotalPriceCustomerWillPay}
                      </Text>
                      <Text
                        textDecorationLine={'line-through'}
                        color={COLORS.textWhite}>
                        &#8377;
                        {totalDiscountAmount}
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
