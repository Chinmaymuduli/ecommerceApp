import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Box, HStack, Pressable, Radio, ScrollView, Text} from 'native-base';
import {COLORS} from 'configs';
import Entypo from 'react-native-vector-icons/Entypo';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AddressType} from 'types';
import {FetchLoader} from 'components/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAddress, useIsMounted} from 'hooks';

type Props = NativeStackScreenProps<PrivateRoutesType, 'SelectAddress'>;
const SelectAddress = ({route, navigation}: Props) => {
  const [address, setAddress] = useState<any>();

  const [addressId, setAddressId] = useState<string | null>();
  const [addressValue, setAddressValue] = React.useState<any>();

  const [loading, setLoading] = useState(false);

  const isMounted = useIsMounted();

  const isProfile = route.params?.isProfile;

  const fetchData = async () => {
    try {
      isMounted.current && setLoading(true);
      const token = await AsyncStorage.getItem('ACCESS_TOKEN');
      const resp = await fetch(
        'https://chhattisgarh-herbals-api.herokuapp.com/api/address/all/my-addresses',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const response_data = await resp.json();

      isMounted.current && setAddress(response_data?.data);
      isMounted.current && setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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

  console.log({addressValue});

  return (
    <>
      {!loading ? (
        <Box flex={1} bg={COLORS.textWhite}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box px={4} borderBottomWidth={10} borderColor={COLORS.lightGrey}>
              <Pressable
                onPress={() =>
                  navigation.navigate(
                    'Address',
                    // {
                    //   SelectAddress: summaryData,
                    // }
                  )
                }
                py={4}>
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
                      value={addressValue}
                      onChange={nextValue => {
                        setAddressValue(nextValue);
                      }}
                      name="myRadioGroup"
                      defaultValue={addressId ? addressId : address[0]._id}
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
                  <Text>Please Add Address</Text>
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
