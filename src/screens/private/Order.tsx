import {Dimensions, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {
  Box,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {AYUSH_1, ORDER, PRODUCT_PLACEHOLDER} from 'assets';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';
import {DrawerActions} from '@react-navigation/native';
import {Empty, FetchLoader} from 'components/core';
import {activeOrderType, PastOrderType} from 'types';
import {PastOrder} from 'components';
import {useSwrApi} from 'hooks';
import {useIsFocused} from '@react-navigation/native';

type Props = NativeStackScreenProps<PrivateRoutesType, 'Order'>;
const Order = ({navigation}: Props) => {
  const [selectionMode, setSelectionMode] = React.useState<any>(1);

  const {data, isValidating, mutate} = useSwrApi('order/orders/my');
  const myOrders = data?.data?.data;

  const myOrder = myOrders?.filter(
    (item: {status: string}) => item?.status !== 'DELIVERED',
  );

  const PastOrderData = myOrders?.filter(
    (item: {status: string}) => item?.status === 'DELIVERED',
  );

  const isFocused = useIsFocused();
  useEffect(() => {
    mutate();
  }, [isFocused]);

  return (
    <>
      {isValidating ? (
        <FetchLoader />
      ) : (
        <Box flex={1} bg={COLORS.textWhite}>
          <HStack
            justifyContent={'space-between'}
            px={4}
            py={4}
            borderBottomWidth={2}
            borderColor={COLORS.lightGrey}>
            <HStack space={4} alignItems={'center'}>
              <Pressable
                justifyContent={'center'}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Ionicons name="grid-outline" size={25} color="green" />
              </Pressable>

              <Text bold fontSize={18}>
                My Order
              </Text>
            </HStack>
          </HStack>
          <HStack px={4} mt={2}>
            <Pressable
              width={Dimensions.get('window').width / 2.3}
              mr={3}
              onPress={() => setSelectionMode(1)}>
              <Box
                bg={selectionMode === 1 ? COLORS.primary : COLORS.lightGrey}
                alignItems={'center'}
                borderRadius={6}>
                <HStack alignItems={'center'} space={1}>
                  <Text
                    bold
                    fontSize={16}
                    color={selectionMode === 1 ? COLORS.textWhite : '#000'}
                    py={2}>
                    Active
                  </Text>
                  <Text
                    color={selectionMode === 1 ? COLORS.textWhite : '#000'}
                    bold>
                    ({myOrder?.length})
                  </Text>
                </HStack>
              </Box>
            </Pressable>
            <Pressable flex={1} onPress={() => setSelectionMode(2)}>
              <Box
                bg={selectionMode === 2 ? COLORS.primary : COLORS.lightGrey}
                alignItems={'center'}
                borderRadius={6}>
                <HStack alignItems={'center'} space={1}>
                  <Text
                    bold
                    fontSize={16}
                    py={2}
                    color={selectionMode === 2 ? COLORS.textWhite : '#000'}>
                    Past Order
                  </Text>
                  <Text color={selectionMode === 2 ? COLORS.textWhite : '#000'}>
                    ({PastOrderData ? PastOrderData?.length : 0})
                  </Text>
                </HStack>
              </Box>
            </Pressable>
          </HStack>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 100,
            }}>
            {selectionMode === 1 ? (
              myOrder?.length > 0 ? (
                myOrder?.map((item: activeOrderType, index: any) => (
                  <Box key={item?._id} px={4} py={4}>
                    <ScrollView>
                      <Box
                        borderWidth={1}
                        borderRadius={5}
                        borderColor={COLORS.lightGrey}>
                        <Pressable>
                          <HStack alignItems={'center'} space={3} py={3} px={3}>
                            <Image
                              source={
                                item?.displayImage?.url
                                  ? {
                                      uri: item?.displayImage?.url,
                                    }
                                  : PRODUCT_PLACEHOLDER
                              }
                              style={styles.image}
                              alt={'activeImg'}
                              resizeMode="contain"
                              bg={COLORS.lightGrey}
                              borderRadius={6}
                            />
                            <VStack>
                              <Text bold fontSize={14}>
                                {item.product?.title}
                              </Text>
                              <Text fontSize={13}>{item.quantity} items</Text>
                            </VStack>
                          </HStack>
                          <VStack px={3} space={1} pb={3}>
                            <HStack justifyContent={'space-between'}>
                              <Text bold>ID Order :</Text>
                              <Text fontSize={15}>{item?._id}</Text>
                            </HStack>
                            <HStack justifyContent={'space-between'}>
                              <Text bold>Total Price :</Text>
                              <Text fontSize={15}>
                                &#8377;{' '}
                                {item?.quantity * item?.product?.salePrice}
                              </Text>
                            </HStack>
                            <HStack justifyContent={'space-between'}>
                              <Text bold>Status :</Text>
                              <Text color={'green.600'} bold>
                                {item?.status}
                              </Text>
                            </HStack>
                          </VStack>
                        </Pressable>
                        <HStack px={3} py={2}>
                          <Pressable
                            w={'full'}
                            onPress={() =>
                              navigation.navigate('OrderDetails', {
                                orderId: item?._id,
                              })
                            }>
                            <Box
                              mr={2}
                              bg={'green.100'}
                              alignItems={'center'}
                              borderRadius={4}>
                              <Text bold py={1}>
                                View Details
                              </Text>
                            </Box>
                          </Pressable>
                        </HStack>
                      </Box>
                    </ScrollView>
                  </Box>
                ))
              ) : (
                <>
                  <Empty
                    animation={ORDER}
                    title={'No Active Order'}
                    h={400}
                    noLoop
                  />
                </>
              )
            ) : PastOrderData.length > 0 ? (
              PastOrderData.map((item: PastOrderType) => (
                <PastOrder item={item} key={item._id} />
              ))
            ) : (
              <>
                <Empty
                  animation={ORDER}
                  title={'No Past Order'}
                  h={400}
                  noLoop
                />
              </>
            )}
          </ScrollView>
        </Box>
      )}
    </>
  );
};

export default Order;

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
  },
});
