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
import {FetchLoader, Track} from 'components/core';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';
import {useSwrApi} from 'hooks';

type Props = NativeStackScreenProps<PrivateRoutesType, 'OrderDetails'>;
const OrderDetails = ({route: {params}}: Props) => {
  const orderID = params?.orderId;
  const {data, isValidating} = useSwrApi(`order/${orderID}`);
  const OrderDetailsData = data?.data?.data;
  // console.log(OrderDetailsData);
  return (
    <>
      {isValidating ? (
        <FetchLoader />
      ) : (
        <Box flex={1} bg={COLORS.textWhite}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box>
              <Box
                borderBottomWidth={1}
                px={5}
                borderBottomColor={COLORS.lightGrey}>
                <Text letterSpacing={1} color={'gray.500'} py={3}>
                  Order ID - {OrderDetailsData?._id}
                </Text>
              </Box>
              <Box borderBottomWidth={3} borderColor={COLORS.lightGrey}>
                <HStack px={5} pt={5}>
                  <VStack space={1} w={'70%'}>
                    <Heading size={'sm'} flexWrap={'wrap'}>
                      {OrderDetailsData?.product?.title}
                    </Heading>
                    <Text color={'gray.500'}>
                      {OrderDetailsData?.quantity} Items
                    </Text>
                    <Text color={'gray.500'}>Seller : Chhatisgarh Herbals</Text>
                    <Text bold fontSize={16}>
                      &#8377;{' '}
                      {OrderDetailsData?.product.salePrice *
                        OrderDetailsData?.quantity}
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
                <Track track={OrderDetailsData} />
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
                  {OrderDetailsData?.shippedTo?.name}
                </Heading>
                <Text>
                  {OrderDetailsData?.shippedTo?.street},
                  {OrderDetailsData?.shippedTo?.city}
                </Text>
                <Text>{OrderDetailsData?.shippedTo?.landmark}</Text>
                <Text>
                  {OrderDetailsData?.shippedTo?.state} -{' '}
                  {OrderDetailsData?.shippedTo?.zip}
                </Text>
                <Text>
                  Phone Number: {OrderDetailsData?.shippedTo?.phoneNumber}
                </Text>
              </Box>
              <Box borderBottomWidth={1} borderColor={COLORS.lightGrey}>
                <Box
                  borderBottomWidth={1}
                  borderColor={COLORS.lightGrey}
                  px={5}>
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
                      <Text textDecorationLine={'line-through'}>
                        &#8377;
                        {OrderDetailsData?.product?.mrp *
                          OrderDetailsData?.quantity}
                      </Text>
                    </HStack>
                    <HStack justifyContent={'space-between'}>
                      <Text>Selling Price</Text>
                      <Text>
                        &#8377;
                        {OrderDetailsData?.totalPrice}
                      </Text>
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
                    <Text bold>
                      &#8377;{' '}
                      {OrderDetailsData?.product?.salePrice *
                        OrderDetailsData?.quantity}
                    </Text>
                  </HStack>
                </Box>
              </Box>
              <Box px={5}>
                <HStack py={2} space={3}>
                  <Octicons
                    name="dot-fill"
                    size={20}
                    color={COLORS.fadeBlack}
                  />
                  <HStack alignItems={'center'} space={2}>
                    <Text>{OrderDetailsData?.billing?.paymentMethod} :</Text>
                    <Text>
                      &#8377;
                      {OrderDetailsData?.totalPrice}
                    </Text>
                  </HStack>
                </HStack>
              </Box>
            </Box>
          </ScrollView>
        </Box>
      )}
    </>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
  },
});
