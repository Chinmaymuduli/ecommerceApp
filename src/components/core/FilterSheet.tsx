import {Dimensions, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Actionsheet,
  Box,
  Heading,
  HStack,
  Pressable,
  Row,
  Text,
  useDisclose,
} from 'native-base';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
const priceArr = [
  {label: 'Below 100', value: 100 - 0},
  {label: '100 - 200', value: 101 - 200},
  {label: '200 - 300', value: 200 - 300},
  {label: '300 - 500', value: 300 - 500},
  {label: 'Above 500', value: 500 - 1000},
];
const rattingArr = [
  {label: '1', value: 1},
  {label: '2', value: 2},
  {label: '3', value: 3},
  {label: '4', value: 4},
  {label: '5', value: 5},
];

const FilterSheet = ({setFilterSheet, filterSheetOpen}: any) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [cardBorder, setCardBorder] = useState<any>();
  const [borderRatting, setBorderRatting] = useState<any>();

  const SelectQuantity = (item: any) => {
    // border color
    setCardBorder(item);
  };
  const SelectRatting = (item: any) => {
    // border color
    setBorderRatting(item);
  };
  return (
    <Actionsheet
      isOpen={filterSheetOpen}
      onClose={() => {
        setFilterSheet(false), onClose();
      }}>
      <Actionsheet.Content>
        <Box width={'100%'} mb={3} px={3}>
          <Heading size={'sm'}>Select Price</Heading>
        </Box>
        <Box w={'100%'} px={3}>
          <Row flexWrap={'wrap'}>
            {priceArr.map((item, index) => (
              <Pressable
                width={Dimensions.get('window').width / 2.5}
                key={index}
                borderWidth={1}
                borderRadius={5}
                bg={'#e4e4e460'}
                borderColor={
                  cardBorder?.value === item.value ? '#228B22' : '#e4e4e4'
                }
                onPress={() => SelectQuantity(item)}
                w={Dimensions.get('window').width / 2.5}
                mx={1}
                my={1}>
                <Text px={2} py={2}>
                  {item?.label}
                </Text>
                {cardBorder?.value === item.value && (
                  <Box
                    bg={'#228B22'}
                    borderTopRightRadius={5}
                    borderBottomLeftRadius={5}
                    alignSelf={'flex-end'}
                    position={'absolute'}>
                    <Ionicons name="checkmark" size={16} color={'#fff'} />
                  </Box>
                )}
              </Pressable>
            ))}
          </Row>
        </Box>
        {/* ratting */}
        <Box width={'100%'} mb={2} px={3} mt={5}>
          <Heading size={'sm'}>Select Rattings</Heading>
        </Box>
        <Box w={'100%'} px={3}>
          <Row flexWrap={'wrap'}>
            {rattingArr.map((item, index) => (
              <Pressable
                width={Dimensions.get('window').width / 2.5}
                key={index}
                borderWidth={1}
                borderRadius={5}
                bg={'#e4e4e460'}
                borderColor={
                  borderRatting?.value === item.value ? '#228B22' : '#e4e4e4'
                }
                onPress={() => SelectRatting(item)}
                w={Dimensions.get('window').width / 2.5}
                mx={1}
                my={1}>
                <HStack alignItems={'center'} justifyContent={'center'}>
                  <Text px={2} py={2}>
                    {item?.label}
                  </Text>
                  <Ionicons name="star" size={16} color={'#FFC107'} />
                </HStack>
                {borderRatting?.value === item.value && (
                  <Box
                    bg={'#228B22'}
                    borderTopRightRadius={5}
                    borderBottomLeftRadius={5}
                    alignSelf={'flex-end'}
                    position={'absolute'}>
                    <Ionicons name="checkmark" size={16} color={'#fff'} />
                  </Box>
                )}
              </Pressable>
            ))}
          </Row>
        </Box>
        <HStack alignItems={'center'} mt={3} ml={5} space={4}>
          <Pressable
            borderWidth={1}
            borderColor={'#228B22'}
            onPress={() => {
              setFilterSheet(false), onClose();
            }}
            borderRadius={5}>
            <Text px={10} py={1} color={'#228B22'}>
              Cancel
            </Text>
          </Pressable>
          <Pressable
            bg={'#228B22'}
            borderRadius={5}
            onPress={() => {
              setFilterSheet(false), onClose();
            }}>
            <Text color={COLORS.textWhite} px={10} py={1} bold>
              Apply
            </Text>
          </Pressable>
        </HStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default FilterSheet;

const styles = StyleSheet.create({});
