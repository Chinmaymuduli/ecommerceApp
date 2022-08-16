import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';
import {OrderSummaryCard} from 'components';
import {useStore} from 'app';
import {useAddress, useIsMounted, useSwrApi} from 'hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FetchLoader} from 'components/core';

type Props = NativeStackScreenProps<PrivateRoutesType, 'OrderSummary'>;
const OrderSummary = ({navigation, route: {params}}: Props) => {
  const isMounted = useIsMounted();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>();
  const productData = useSwrApi(
    params?.type === 'product'
      ? `orders/summary?type=${params.type}&quantity=${params.quantity}&productId=${params.productId}`
      : `orders/summary?type=cart`,
  );
  const OrderSummaryData = productData?.data?.data?.data;

  useEffect(() => {
    (async () => {
      const addressID = await AsyncStorage.getItem('address_id');
      isMounted.current && setSelectedAddressId(addressID);
    })();
  }, []);

  const {data, isValidating, mutate} = useSwrApi(
    `address/${selectedAddressId}`,
  );

  const SelectedAddress = data?.data?.data;

  // console.log(params?.quantity);
  const quantityData = OrderSummaryData?.products?.find(
    (item: {quantity: number}) => item?.quantity,
  );

  return (
    <>
      {isValidating ? (
        <FetchLoader />
      ) : (
        <Box flex={1} bg={COLORS.textWhite}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box
              px={5}
              mt={5}
              borderBottomWidth={10}
              borderColor={COLORS.lightGrey}>
              <HStack justifyContent={'space-between'} alignItems={'center'}>
                <Heading size={'sm'}>Deliver to:</Heading>
                <Pressable
                  onPress={() => navigation.navigate('SelectAddress', {})}>
                  <Box
                    borderWidth={1}
                    borderColor={COLORS.primary}
                    borderRadius={5}>
                    <Text color={COLORS.primary} bold px={3} py={1}>
                      Change
                    </Text>
                  </Box>
                </Pressable>
              </HStack>
              <VStack mt={2} space={1} pb={4}>
                <HStack space={4}>
                  <Text bold>{SelectedAddress?.name}</Text>
                  <Box bg={'green.100'} borderRadius={5}>
                    <Text px={2}>{SelectedAddress?.type}</Text>
                  </Box>
                </HStack>
                <Text fontSize={13}>
                  {SelectedAddress?.landmark} {SelectedAddress?.street} ,{' '}
                  {SelectedAddress?.city} , {SelectedAddress?.state} -{' '}
                  {SelectedAddress?.zip}
                </Text>
                <Text>
                  +{SelectedAddress?.countryCode} {SelectedAddress?.phoneNumber}
                </Text>
              </VStack>
            </Box>
            {/* card */}
            {/* {cartData.map((od: CartItemType) => (
        <OrderSummaryCard key={od.product?._id} orderData={od} />
      ))} */}
            {OrderSummaryData?.products?.map((od: any) => (
              <OrderSummaryCard key={od._id} orderData={od} />
            ))}
            {/* Card End */}
            <Box>
              <Box py={4} mb={10}>
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
                      {/* <Text>100</Text> */}
                      <Text>{OrderSummaryData?.totalMrp}</Text>
                    </HStack>
                    <HStack justifyContent={'space-between'}>
                      <Text>Discount</Text>
                      <Text color={'green.600'}>
                        - &#8377;
                        {OrderSummaryData?.discount}
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
                    {/* <Text bold>&#8377; 200</Text> */}
                    <Text bold>&#8377; {OrderSummaryData?.totalSalePrice}</Text>
                  </HStack>
                </Box>
                <Box px={4} py={2}>
                  <Text color={'green.600'}>
                    You will save &#8377; {OrderSummaryData?.discount} on this
                    order
                  </Text>
                </Box>
              </Box>
            </Box>
            {/* Proceed to pay */}
          </ScrollView>
          <Box w={'full'} position={'absolute'} bottom={1}>
            <Pressable
              justifyContent={'center'}
              mx={4}
              bg={'#008000'}
              borderRadius={4}
              onPress={() =>
                navigation.navigate('PaymentScreen', {
                  // PaymentData: OrderSummaryData,
                  type: params?.type,
                  quantity: quantityData.quantity,
                  productId: params?.productId,
                  addressId: selectedAddressId,
                  totalMrp: OrderSummaryData?.totalMrp,
                  totalSalePrice: OrderSummaryData?.totalSalePrice,
                  discount: OrderSummaryData?.discount,
                })
              }>
              <HStack
                justifyContent={'space-between'}
                py={2}
                alignItems={'center'}>
                <HStack alignItems={'center'} space={2} pl={2}>
                  <Box>
                    <Text bold color={'#fff'}>
                      {/* {orderItems.length} items */}1 items
                    </Text>
                  </Box>
                  <HStack space={2}>
                    <Text bold color={'#fff'}>
                      |
                    </Text>
                    <Text bold color={'#fff'}>
                      &#8377; {OrderSummaryData?.totalSalePrice}
                    </Text>
                    <Text textDecorationLine={'line-through'} color={'#fff'}>
                      &#8377; {OrderSummaryData?.discount}
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
      )}
    </>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({});
