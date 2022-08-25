import {RefreshControl} from 'react-native';
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
import {CART} from 'assets';
import {DrawerActions} from '@react-navigation/native';
import {Empty, FetchLoader} from 'components/core';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CartItemType} from 'types';
import {CartItem} from 'components';
import {useSwrApi} from 'hooks';
import {useIsFocused} from '@react-navigation/native';

type Props = NativeStackScreenProps<PrivateRoutesType, 'Cart'>;
const Cart = ({route, navigation}: Props) => {
  const {data, mutate, isLoading, isValidating} = useSwrApi('cart/all');

  const CartItems = data?.data?.data;
  const isFocused = useIsFocused();
  const [quantity, setQuantity] = React.useState();

  const handleProceed = () => {
    navigation.navigate('OrderSummary', {
      type: 'cart',
    });
  };

  React.useEffect(() => {
    if (isFocused) {
      mutate();
    }
  }, [isFocused]);

  return (
    <>
      {!isValidating && isFocused ? (
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

          {CartItems?.products?.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={() => mutate()}
                />
              }>
              <Box>
                <HStack
                  justifyContent={'space-between'}
                  px={3}
                  bg={'#e4e4e460'}
                  py={3}>
                  <Text fontSize={13}>shipment 1 of 1</Text>
                </HStack>

                <Box>
                  {CartItems?.products?.map((item: CartItemType) => (
                    <CartItem
                      item={item}
                      key={item?._id}
                      setQuantity={setQuantity}
                      mutate={mutate}
                    />
                  ))}
                </Box>
                <Box
                  px={4}
                  py={4}
                  borderBottomWidth={6}
                  borderColor={'#e4e4e460'}>
                  <Heading size={'sm'}>Bill details</Heading>
                  <VStack space={1} py={3}>
                    <HStack
                      alignItems={'center'}
                      justifyContent={'space-between'}>
                      <Text fontSize={12} bold>
                        MRP
                      </Text>
                      <Text>
                        &#8377;
                        {CartItems?.mrp}
                      </Text>
                    </HStack>
                    <HStack
                      alignItems={'center'}
                      justifyContent={'space-between'}>
                      <Text fontSize={12} bold>
                        Product discount
                      </Text>
                      <Text color={'green.500'}>
                        - &#8377;
                        {CartItems?.mrp - CartItems?.subTotal}
                      </Text>
                    </HStack>
                    <HStack
                      alignItems={'center'}
                      justifyContent={'space-between'}>
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
                    <Text bold>&#8377;{CartItems?.subTotal}</Text>
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
                            {CartItems.totalItem} items
                          </Text>
                        </Box>
                        <HStack space={2}>
                          <Text bold color={COLORS.textWhite}>
                            |
                          </Text>
                          <Text bold color={COLORS.textWhite}>
                            &#8377; {CartItems?.subTotal}
                          </Text>
                          <Text
                            textDecorationLine={'line-through'}
                            color={COLORS.textWhite}>
                            &#8377;
                            {CartItems?.mrp - CartItems?.subTotal}
                          </Text>
                        </HStack>
                      </HStack>
                      <HStack space={2} alignItems={'center'}>
                        <Text bold color={'#fff'}>
                          Proceed
                        </Text>
                        <Ionicons
                          name="chevron-forward"
                          size={25}
                          color={'#fff'}
                        />
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
      ) : (
        <FetchLoader />
      )}
    </>
  );
};

export default Cart;
