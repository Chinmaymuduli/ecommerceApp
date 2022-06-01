import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Heading,
  HStack,
  Pressable,
  Radio,
  ScrollView,
  Text,
} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS} from 'configs';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {useNavigation} from '@react-navigation/native';

const PaymentScreen = () => {
  const [payment, setPayment] = useState<any>();
  const navigation = useNavigation<NavigationProps>();
  return (
    <Box flex={1} bg={COLORS.lightGrey}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box bg={COLORS.textWhite} pb={1}>
          <Box mt={5}>
            <Box borderBottomWidth={1} borderColor={COLORS.lightGrey} px={4}>
              <Heading size={'sm'}>Price details</Heading>
            </Box>
            <Box px={4}>
              <Box
                borderBottomWidth={1}
                borderColor={COLORS.lightGrey}
                borderBottomStyle={'dashed'}>
                <HStack
                  pt={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Text>Price(2 items)</Text>
                  <Text>&#8377;344</Text>
                </HStack>

                <HStack
                  pt={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Text>Saving</Text>
                  <Text color={'green.500'}>- &#8377;100</Text>
                </HStack>
                <HStack
                  pt={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Text>Coupon Discount</Text>
                  <Text color={'green.500'}>- &#8377;0</Text>
                </HStack>
                <HStack
                  mb={2}
                  pt={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Text>Delivery Charges</Text>
                  <Text color={'green.500'}>free</Text>
                </HStack>
              </Box>
            </Box>
            <Box px={4} mt={2} mb={2}>
              <HStack justifyContent={'space-between'} alignItems={'center'}>
                <Text>Amount Payable</Text>
                <Text bold>&#8377;244</Text>
              </HStack>
            </Box>
          </Box>
        </Box>
        <Box>
          <Pressable
            // bg={'#e4e4e460'}
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
          </Pressable>
        </Box>
        <Box bg={COLORS.textWhite} px={4} h={360}>
          <Box py={3}>
            <Heading size={'sm'}>Payment Method</Heading>
          </Box>
          <Box>
            <Radio.Group
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              defaultValue="payOnline"
              value={payment}
              onChange={nextValue => {
                setPayment(nextValue);
              }}>
              <Radio value="payOnline" my={1}>
                Pay Online
              </Radio>
              <Radio value="cod" my={3}>
                Cash On Delivery
              </Radio>
            </Radio.Group>
          </Box>
        </Box>
      </ScrollView>
      <Box
        position={'absolute'}
        bottom={0}
        bg={COLORS.textWhite}
        w={'full'}
        borderTopWidth={1}
        shadow={5}
        borderColor={COLORS.lightGrey}>
        <Box px={4}>
          <HStack
            justifyContent={'space-evenly'}
            alignItems={'center'}
            space={7}>
            <Box my={1}>
              <Text bold py={3}>
                &#8377;244
              </Text>
            </Box>
            <Pressable
              my={1}
              bg={COLORS.cgcolor}
              borderRadius={3}
              ml={4}
              onPress={() => navigation.navigate('ConfirmOrder')}>
              <Text
                bold
                px={57}
                py={3}
                color={COLORS.textWhite}
                letterSpacing={1}>
                Continue
              </Text>
            </Pressable>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
