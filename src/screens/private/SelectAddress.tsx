import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, HStack, Pressable, Radio, ScrollView, Text} from 'native-base';
import {COLORS} from 'configs';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
const AddressArr = [
  {
    id: 1,
    name: 'Sai Kiran',
    address:
      '#12, 1st Cross, 1st Main, 1st Block, Koramangala, Bengaluru, Karnataka 560034',
    phone: '+91 9876543210',
    default: true,
    value: '1',
  },
  {
    id: 2,
    name: 'Sai Satya',
    address:
      '#12, 1st Cross, 2nd Main, 2nd Block, Koramangala, Bengaluru, Karnataka 560032',
    phone: '+91 1234567890',
    default: false,
    value: '2',
  },
  {
    id: 3,
    name: 'John Deo',
    address:
      '#15, 3rd Cross, 1st Main, 3rd Block, Koramangala, Bengaluru, Karnataka 560031',
    phone: '+91 8794562310',
    default: false,
    value: '3',
  },
];

const SelectAddress = () => {
  const navigation = useNavigation<NavigationProps>();
  const [value, setValue] = React.useState(AddressArr[0].address);

  return (
    <Box flex={1} bg={COLORS.textWhite}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box px={4} borderBottomWidth={10} borderColor={COLORS.lightGrey}>
          <Pressable onPress={() => navigation.navigate('Address')} py={4}>
            <HStack
              py={1}
              borderRadius={5}
              alignItems={'center'}
              borderWidth={1}
              justifyContent={'center'}
              space={2}>
              <Entypo name="plus" size={30} color={COLORS.cgcolor} />
              <Text bold>Add a new address</Text>
            </HStack>
          </Pressable>
        </Box>
        <Box px={2}>
          {AddressArr.length > 0 ? (
            AddressArr.map(item => (
              <Box
                key={item.id}
                mt={3}
                borderBottomWidth={1}
                borderColor={COLORS.lightGrey}>
                <Radio.Group
                  value={value}
                  onChange={nextValue => {
                    setValue(nextValue);
                  }}
                  name="myRadioGroup"
                  accessibilityLabel="favorite number">
                  <Radio value={item?.value} my={4} mx={2} colorScheme="green">
                    <Box pb={3}>
                      <Text bold>{item?.name}</Text>
                      <Text flexWrap={'wrap'} mt={2} w={300}>
                        {item?.address}
                      </Text>
                      <Text mt={2} bold>
                        {item?.phone}
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
      <Box w={'full'} position={'absolute'} bottom={0}>
        <Pressable
          bg={'#008000'}
          borderRadius={4}
          mx={3}
          onPress={() => navigation.navigate('OrderSummary')}>
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
    </Box>
  );
};

export default SelectAddress;

const styles = StyleSheet.create({});