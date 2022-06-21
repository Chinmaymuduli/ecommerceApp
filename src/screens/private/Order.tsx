import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {
  Box,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {AYUSH_1, ORDER} from 'assets';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';
import {DrawerActions} from '@react-navigation/native';
import {Empty, PastOrder} from 'components/core';

const activeOrder = [
  {
    label: 'Jyotishmati Oil',
    OrderID: '#12345',
    status: 'Shipping',
    price: 599,
    img: AYUSH_1,
    total: '3 Items',
  },
];

const pastOrders = [
  {
    label: 'Jyotishmati Oil',
    OrderID: '#12345',
    status: 'Shipped',
    price: 599,
    img: AYUSH_1,
    total: '1 Items',
  },
];
type Props = NativeStackScreenProps<PrivateRoutesType, 'Order'>;
const Order = ({navigation}: Props) => {
  const [selectionMode, setSelectionMode] = React.useState<any>(1);

  return (
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
            bg={selectionMode === 1 ? COLORS.cgcolor : COLORS.lightGrey}
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
                (1)
              </Text>
            </HStack>
          </Box>
        </Pressable>
        <Pressable flex={1} onPress={() => setSelectionMode(2)}>
          <Box
            bg={selectionMode === 2 ? COLORS.cgcolor : COLORS.lightGrey}
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
                (1)
              </Text>
            </HStack>
          </Box>
        </Pressable>
      </HStack>
      {selectionMode === 1 ? (
        activeOrder.length > 0 ? (
          activeOrder.map((item: any, index: any) => (
            <Box key={index} px={4} py={4}>
              <ScrollView>
                <Box
                  borderWidth={1}
                  borderRadius={5}
                  borderColor={COLORS.lightGrey}>
                  <Pressable>
                    <HStack alignItems={'center'} space={3} py={3} px={3}>
                      <Image
                        source={AYUSH_1}
                        style={styles.image}
                        alt={'activeImg'}
                        resizeMode="contain"
                        bg={COLORS.lightGrey}
                        borderRadius={6}
                      />
                      <VStack>
                        <Text bold fontSize={14}>
                          {item.label}
                        </Text>
                        <Text fontSize={13}>{item.total}</Text>
                      </VStack>
                    </HStack>
                    <VStack px={3} space={1} pb={3}>
                      <HStack justifyContent={'space-between'}>
                        <Text bold>ID Order :</Text>
                        <Text fontSize={15}>{item?.OrderID}</Text>
                      </HStack>
                      <HStack justifyContent={'space-between'}>
                        <Text bold>Total Price :</Text>
                        <Text fontSize={15}>&#8377; {item?.price}</Text>
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
                      onPress={() => navigation.navigate('OrderDetails')}>
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
            <Empty animation={ORDER} title={'No Active Order'} h={400} noLoop />
          </>
        )
      ) : pastOrders.length > 0 ? (
        pastOrders.map((item: any) => (
          <PastOrder item={item} key={item.label} />
        ))
      ) : (
        <>
          <Empty animation={ORDER} title={'No Past Order'} h={400} noLoop />
        </>
      )}
    </Box>
  );
};

export default Order;

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
  },
});
