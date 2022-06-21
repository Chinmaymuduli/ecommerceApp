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

const CouponArr = [
  {
    id: 1,
    code: 'COUPON1',
    discount: '10%',
    description: 'Use code COUPON1 to get Rs.50 OFF on orders above Rs.400',
    term1:
      'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without',
    term2:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    expiry: '20/12/2020',
    discountValue: 30,
  },
  {
    id: 2,
    code: 'COUPON2',
    discount: '20%',
    description: '20% discount on all products',
    term1:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae',
    term2:
      'totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam  quasi aliquam eligendi, placeat qui corporis!',
    expiry: '20/12/2020',
    discountValue: 20,
  },
];

type Props = NativeStackScreenProps<PrivateRoutesType, 'Coupon'>;
const Coupon = ({route}: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const [couponCode, setCouponCode] = React.useState('');
  //   console.log('object', couponCode.length);
  const [termandcondition, setTermandcondition] = React.useState<any>();
  //   console.log('object', termandcondition);
  const [couponAlert, setCouponAlert] = React.useState(false);
  const {isOpen, onOpen, onClose} = useDisclose();

  const Conditions = (item: any) => {
    setTermandcondition(item);
    onOpen();
  };
  const ApplyCoupon = (item: any) => {
    setCouponAlert(true);
    setTimeout(() => {
      setCouponAlert(false);
      navigation.navigate('PaymentScreen', {
        ...route.params,
        couponValue: item?.discountValue,
      });
    }, 1000);
  };
  return (
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
                  bg={COLORS.cgcolor}
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
            some coupon codes are not valid on purchase of sweets, chawanprash
            products
          </Text>
        </Box>
        <Box px={5} mt={6}>
          <Heading size={'sm'}>Available coupons</Heading>
          <Box mt={4}>
            {CouponArr.map(item => (
              <Box
                key={item.id}
                py={2}
                borderWidth={1}
                mb={4}
                borderRadius={7}
                borderColor={COLORS.lightGrey}>
                <VStack px={3}>
                  <Text>{item?.description}</Text>
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
                    <Pressable
                      onPress={() => ApplyCoupon(item)}
                      borderWidth={1}
                      borderRadius={6}
                      borderColor={COLORS.cgcolor}>
                      <Text color={COLORS.cgcolor} px={2} py={1}>
                        Apply
                      </Text>
                    </Pressable>
                  </HStack>
                </HStack>
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
              <HStack alignItems={'center'} justifyContent={'space-between'}>
                <Text bold py={3}>
                  Terms & Conditions
                </Text>
                <Pressable onPress={onClose}>
                  <AntDesign name="close" size={20} color={COLORS.fadeBlack} />
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
              <Text pl={2}>{termandcondition?.term1}</Text>
            </Box>
            <Box mt={2} flexDirection={'row'}>
              <Box
                style={{
                  height: 5,
                  width: 5,
                  backgroundColor: '#000',
                  borderRadius: 20,
                  marginTop: 8,
                }}></Box>
              <Text pl={2}>{termandcondition?.term2}</Text>
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
  );
};

export default Coupon;

const styles = StyleSheet.create({});
