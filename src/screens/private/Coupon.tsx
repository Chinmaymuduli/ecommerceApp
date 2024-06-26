import {StyleSheet} from 'react-native';
import React from 'react';
import {
  Actionsheet,
  Alert,
  Box,
  Center,
  Heading,
  HStack,
  Input,
  Pressable,
  ScrollView,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import {COLORS} from 'configs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps, PrivateRoutesType} from 'src/routes/PrivateRoutes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProductDetailsType} from 'types';
import {useSwrApi} from 'hooks';
import {FetchLoader} from 'components/core';

type Props = NativeStackScreenProps<PrivateRoutesType, 'Coupon'>;
const Coupon = ({route: {params}}: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const [couponCode, setCouponCode] = React.useState('');
  const [termAndCondition, setTermAndCondition] = React.useState<any>();
  const [couponAlert, setCouponAlert] = React.useState(false);
  const {isOpen, onOpen, onClose} = useDisclose();

  const Conditions = (item: ProductDetailsType) => {
    setTermAndCondition(item);
    onOpen();
  };
  const ApplyCoupon = (value: any) => {
    setCouponAlert(true);
    setTimeout(() => {
      setCouponAlert(false);
      navigation.navigate('PaymentScreen', {
        couponId: value,
        addressId: params?.addressId,
        productId: params?.productId,
        quantity: params?.quantity,
        type: params?.type,
      });
    }, 1000);
  };

  const {data, isValidating, mutate} = useSwrApi('coupons/active');
  const CouponData: {
    _id?: string;
    code?: string;
    discount?: number;
    endDate?: string;
    maxDiscount?: number;
    maxUses?: number;
    startDate?: string;
    minOrderAmount?: number;
  }[] = data?.data?.data;

  return (
    <>
      {isValidating ? (
        <FetchLoader />
      ) : (
        <Box bg={COLORS.textWhite} flex={1}>
          <ScrollView>
            <Box
              borderWidth={1}
              mx={5}
              borderRadius={5}
              mt={4}
              borderColor={COLORS.lightGrey}>
              <Input
                placeholder="Enter Coupon Code"
                variant={'unstyled'}
                fontWeight={'bold'}
                fontSize={15}
                onChangeText={text => {
                  setCouponCode(text);
                }}
                value={couponCode}
                InputRightElement={
                  couponCode.length > 0 ? (
                    <Pressable
                      bg={COLORS.primary}
                      px={5}
                      py={1}
                      mr={1}
                      borderRadius={4}>
                      <Text bold color={COLORS.textWhite}>
                        apply
                      </Text>
                    </Pressable>
                  ) : (
                    <Box
                      bg={COLORS.lightGrey}
                      px={5}
                      py={1}
                      mr={1}
                      borderRadius={4}>
                      <Text bold color={COLORS.textWhite}>
                        apply
                      </Text>
                    </Box>
                  )
                }
              />
            </Box>
            <Box flexDirection={'row'} px={5} mt={2}>
              <Box
                style={{
                  height: 5,
                  width: 5,
                  backgroundColor: '#e4e4e4',
                  borderRadius: 20,
                  marginTop: 6,
                }}></Box>
              <Text fontSize={11} pl={2} color={COLORS.grey}>
                some coupon codes are not valid on purchase of sweets,
                chawanprash products
              </Text>
            </Box>
            <Box px={5} mt={6}>
              <Heading size={'sm'}>Available coupons</Heading>
              <Box mt={4}>
                {CouponData?.map(item => (
                  <Box
                    key={item._id}
                    py={2}
                    borderWidth={1}
                    mb={4}
                    borderRadius={7}
                    borderColor={COLORS.lightGrey}>
                    <VStack px={3}>
                      <Text>
                        Use code{' '}
                        <Text bold color={COLORS.primary} underline>
                          {item?.code}
                        </Text>{' '}
                        to get maximum Rs.
                        {item?.maxDiscount} discount
                      </Text>
                    </VStack>
                    <HStack px={3} justifyContent={'space-between'} mt={4}>
                      <Pressable onPress={() => Conditions(item)}>
                        <Text fontSize={13} py={2} color={'green.600'} bold>
                          View Details
                        </Text>
                      </Pressable>
                      <HStack space={5}>
                        <Box
                          bg={'blue.100'}
                          borderWidth={1}
                          borderStyle={'dashed'}
                          borderColor={'blue.400'}>
                          <Text
                            fontWeight={'bold'}
                            color={COLORS.grey}
                            px={1}
                            py={1}>
                            {item?.code}
                          </Text>
                        </Box>
                        {params?.couponId !== item?._id &&
                        (params?.totalPrice || 0) >
                          (item?.minOrderAmount || 0) ? (
                          <Pressable
                            onPress={() => ApplyCoupon(item?._id)}
                            borderWidth={1}
                            borderRadius={6}
                            borderColor={COLORS.primary}>
                            <Text color={COLORS.primary} px={2} py={1} bold>
                              Apply
                            </Text>
                          </Pressable>
                        ) : (
                          <Box bg={COLORS.lightGrey} borderRadius={6}>
                            <Text color={COLORS.danger} px={2} py={1} bold>
                              Apply
                            </Text>
                          </Box>
                        )}
                      </HStack>
                    </HStack>
                    {item?.minOrderAmount && (
                      <Text pl={2} pt={1} fontSize={13} color={COLORS.primary}>
                        *Minimum Order Amount Will be {item?.minOrderAmount}
                      </Text>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </ScrollView>
          {/* Action Sheet */}
          <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
            <Actionsheet.Content>
              <Box w={'100%'} px={2}>
                <Box borderBottomWidth={1} borderColor={COLORS.lightGrey}>
                  <HStack
                    alignItems={'center'}
                    justifyContent={'space-between'}>
                    <Text bold py={3}>
                      Terms & Conditions
                    </Text>
                    <Pressable onPress={onClose}>
                      <AntDesign
                        name="close"
                        size={20}
                        color={COLORS.fadeBlack}
                      />
                    </Pressable>
                  </HStack>
                </Box>
                <Box mt={3} flexDirection={'row'}>
                  <Box
                    style={{
                      height: 5,
                      width: 5,
                      backgroundColor: '#000',
                      borderRadius: 20,
                      marginTop: 8,
                    }}></Box>
                  <Text pl={2}>
                    Use code <Text bold>{termAndCondition?.code}</Text> to get
                    maximum Rs.
                    {termAndCondition?.maxDiscount} discount
                  </Text>
                </Box>
              </Box>
            </Actionsheet.Content>
          </Actionsheet>
          {/* Coupon alert */}
          {couponAlert && (
            <Center mx={3} mb={3}>
              <Alert
                w="100%"
                variant={'subtle'}
                colorScheme="success"
                status="success">
                <VStack space={2} flexShrink={1} w="100%">
                  <HStack
                    flexShrink={1}
                    space={2}
                    alignItems="center"
                    justifyContent="space-between">
                    <HStack space={2} flexShrink={1} alignItems="center">
                      <Alert.Icon />
                      <Text color={'coolGray.800'}>Successfully applied!</Text>
                    </HStack>
                  </HStack>
                </VStack>
              </Alert>
            </Center>
          )}
        </Box>
      )}
    </>
  );
};

export default Coupon;

const styles = StyleSheet.create({});
