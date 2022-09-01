import {RefreshControl, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Box,
  Center,
  Heading,
  HStack,
  Pressable,
  Radio,
  ScrollView,
  Text,
} from 'native-base';
import {COLORS} from 'configs';
import Entypo from 'react-native-vector-icons/Entypo';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AddressType} from 'types';
import {FetchLoader} from 'components/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAddress, useIsMounted, useSwrApi} from 'hooks';
import {useIsFocused} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {NO_RESULT} from 'assets';
import useSWR from 'swr';
import {GET} from 'api';

type Props = NativeStackScreenProps<PrivateRoutesType, 'SelectAddress'>;
const SelectAddress = ({route, navigation}: Props) => {
  const [address, setAddress] = useState<any>();

  const [addressId, setAddressId] = useState<string | null>();
  const [addressValue, setAddressValue] = React.useState<any>('');
  const isFocused = useIsFocused();

  const isMounted = useIsMounted();

  const isProfile = route.params?.isProfile;
  const {data, mutate, isValidating} = useSWR('address/all/my-addresses', GET);
  // const {data, mutate, isValidating} = useSwrApi('address/all/my-addresses');

  useEffect(() => {
    console.log({data});
    isMounted.current && setAddress(data?.data);
    mutate();
  }, [isFocused, isMounted, data]);

  const handelDeliver = async () => {
    await AsyncStorage.setItem('address_id', addressValue);
    navigation.navigate('OrderSummary', {
      type: route.params?.type,
      productId: route.params?.productId,
      quantity: route.params?.quantity,
    });
  };

  useEffect(() => {
    (async () => {
      const addressValue = await AsyncStorage.getItem('address_id');
      isMounted.current && setAddressId(addressValue);
      isMounted.current && setAddressValue(addressValue);
    })();
  }, []);

  console.log(address);
  // console.log(addressValue);

  return (
    <>
      {data ? (
        <Box flex={1} bg={COLORS.textWhite}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            refreshControl={
              <RefreshControl
                refreshing={isValidating}
                onRefresh={() => mutate()}
              />
            }>
            <Box px={4} borderBottomWidth={10} borderColor={COLORS.lightGrey}>
              <Pressable onPress={() => navigation.navigate('Address')} py={4}>
                <HStack
                  py={1}
                  borderRadius={5}
                  alignItems={'center'}
                  borderWidth={1}
                  justifyContent={'center'}
                  space={2}>
                  <Entypo name="plus" size={30} color={COLORS.primary} />
                  <Text bold>Add a new address</Text>
                </HStack>
              </Pressable>
            </Box>
            <Box px={2}>
              {address?.length > 0 ? (
                address.map((item: any) => (
                  <Box
                    key={item._id}
                    mt={3}
                    borderBottomWidth={1}
                    borderColor={COLORS.lightGrey}>
                    <Radio.Group
                      value={addressValue ?? address[0]?._id}
                      onChange={nextValue => {
                        isMounted.current && setAddressValue(nextValue);
                      }}
                      name="myRadioGroup"
                      defaultValue={address[0]?._id}
                      // defaultValue={addressId ? addressId : address[0]._id }
                      accessibilityLabel="Select address">
                      <Radio
                        value={item?._id}
                        my={4}
                        mx={2}
                        colorScheme="green">
                        <Box pb={3}>
                          <HStack space={2}>
                            <Text bold>{item?.name}</Text>
                            <Box bg={'green.100'} borderRadius={5}>
                              <Text px={2}>{item.type}</Text>
                            </Box>
                          </HStack>
                          <Text flexWrap={'wrap'} mt={2} w={300}>
                            {item?.landmark} {item?.street} {item?.city}{' '}
                            {item?.state} {item?.zip}
                          </Text>
                          <Text mt={2} bold>
                            {item?.phoneNumber}
                          </Text>
                        </Box>
                      </Radio>
                    </Radio.Group>
                  </Box>
                ))
              ) : (
                <Box>
                  <Center h={450}>
                    <LottieView source={NO_RESULT} autoPlay loop={true} />
                  </Center>
                  <Box alignItems={'center'} mt={-10}>
                    <Heading size={'md'}>No Address Found</Heading>
                  </Box>
                </Box>
              )}
            </Box>
          </ScrollView>
          {!isProfile ? (
            <Box w={'full'} position={'absolute'} bottom={6}>
              <Pressable
                bg={'#008000'}
                borderRadius={4}
                mx={3}
                onPress={() => handelDeliver()}>
                <Text
                  color={COLORS.textWhite}
                  bold
                  textAlign={'center'}
                  py={2}
                  letterSpacing={1}>
                  Deliver Here
                </Text>
              </Pressable>
            </Box>
          ) : null}
        </Box>
      ) : (
        <FetchLoader />
      )}
    </>
  );
};

export default SelectAddress;

const styles = StyleSheet.create({});
