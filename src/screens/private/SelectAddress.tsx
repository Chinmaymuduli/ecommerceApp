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
const AddressArr = [
  {
    id: 1,
    name: 'Sai Kiran',
    address:
      '#12, 1st Cross, 1st Main, 1st Block, Koramangala, Bengaluru, Karnataka 560034',
    phone: '+91 9876543210',
    default: true,
    addressType: 'Home',
    value: '1',
  },
  {
    id: 2,
    name: 'Sai Satya',
    address:
      '#12, 1st Cross, 2nd Main, 2nd Block, Koramangala, Bengaluru, Karnataka 560032',
    phone: '+91 1234567890',
    default: false,
    addressType: 'Home',
    value: '2',
  },
  {
    id: 3,
    name: 'John Deo',
    address:
      '#15, 3rd Cross, 1st Main, 3rd Block, Koramangala, Bengaluru, Karnataka 560031',
    phone: '+91 8794562310',
    default: false,
    addressType: 'Work',
    value: '3',
  },
];

type Props = NativeStackScreenProps<PrivateRoutesType, 'SelectAddress'>;
const SelectAddress = ({route, navigation}: Props) => {
  const [address, setAddress] = useState<any>();
  const [value, setValue] = React.useState(address ? address[0] : null);

  const [loading, setLoading] = useState(false);
  // console.log({value});

  const isProfile = route.params?.isProfile;

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('access_token');
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

      setAddress(response_data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
                      value={value}
                      onChange={nextValue => {
                        setValue(nextValue);
                      }}
                      name="myRadioGroup"
                      defaultValue={value}
                      accessibilityLabel="Select address">
                      <Radio value={item} my={4} mx={2} colorScheme="green">
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
                onPress={() =>
                  navigation.navigate(
                    'OrderSummary',
                    //  {
                    //   CartItems: summaryData,
                    // }
                  )
                }>
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
