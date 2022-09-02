import {Alert, RefreshControl, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AlertDialog,
  Box,
  Button,
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

import {FetchLoader} from 'components/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsMounted} from 'hooks';
import {useIsFocused} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {NO_RESULT} from 'assets';
import useSWR from 'swr';
import {GET, put, remove} from 'api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AddressType} from 'types';

type Props = NativeStackScreenProps<PrivateRoutesType, 'SelectAddress'>;
const SelectAddress = ({route, navigation}: Props) => {
  const [address, setAddress] = useState<AddressType[]>([]);

  const [addressValue, setAddressValue] = React.useState<string>('');
  const [deleteAddressId, setDeleteAddressId] = useState<string>('');
  const [isOpen, setIsOpen] = React.useState(false);
  const isFocused = useIsFocused();
  const isMounted = useIsMounted();
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);
  const isProfile = route.params?.isProfile;
  const {data, mutate, isValidating} = useSWR('address/all/my-addresses', GET);

  useEffect(() => {
    // console.log({data});
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

  const handelAddress = (id: string) => {
    isMounted.current && setIsOpen(!isOpen);
    isMounted.current && setDeleteAddressId(id);
  };

  const handelDeleteAddress = async () => {
    try {
      isMounted.current && setIsOpen(!isOpen);
      console.log(`address/${deleteAddressId}`);
      const res = await remove({
        path: `address/${deleteAddressId}`,
      });
      if (res?.status === 200) {
        mutate();
      } else {
        Alert.alert('Error', res.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      mutate();
    }
  };

  const handelSelectAddress = async (id: string) => {
    try {
      const res = await put({
        path: `address/${id}`,
        body: JSON.stringify({
          isDefault: true,
        }),
      });
      console.log({res});
      if (res?.status === 200) {
        isMounted.current && setAddressValue(id);
        mutate();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log({addressValue});

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
              <Pressable
                onPress={() =>
                  navigation.navigate('Address', {
                    type: route.params?.type,
                    productId: route.params?.productId,
                    quantity: route.params?.quantity,
                  })
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
                address?.map((item: AddressType) => (
                  <Box
                    key={item._id}
                    mt={3}
                    borderBottomWidth={1}
                    borderColor={COLORS.lightGrey}>
                    <Radio.Group
                      // value={addressValue}
                      value={item?.isDefault === true ? item?._id : ''}
                      // onChange={nxt => setAddressValue(nxt)}
                      onChange={() => handelSelectAddress(item?._id)}
                      name="myRadioGroup"
                      accessibilityLabel="Select address">
                      <Radio
                        value={item?._id}
                        my={4}
                        mx={2}
                        colorScheme="green">
                        <Box pb={3}>
                          <HStack space={2} justifyContent={'space-between'}>
                            <HStack space={3}>
                              <Text bold>{item?.name}</Text>
                              <Box bg={'green.100'} borderRadius={5}>
                                <Text px={2}>{item.type}</Text>
                              </Box>
                            </HStack>
                            <Pressable
                              mr={5}
                              onPress={() => handelAddress(item?._id)}>
                              <MaterialCommunityIcons
                                name="delete"
                                size={20}
                                color={COLORS.danger}
                              />
                            </Pressable>
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

      {/* Alert Dialog */}
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Address</AlertDialog.Header>
          <AlertDialog.Body>
            This will cancel your address. This action cannot be reversed.
            Cancel data can not be recovered.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}>
                Cancel
              </Button>
              <Button
                colorScheme="danger"
                onPress={() => handelDeleteAddress()}>
                Delete Address
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};

export default SelectAddress;

const styles = StyleSheet.create({});
