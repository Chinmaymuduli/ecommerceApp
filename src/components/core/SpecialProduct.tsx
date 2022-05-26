import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {Box, FlatList, HStack, Image, Pressable, Text} from 'native-base';
import {COLORS} from 'configs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SpecialProduct = ({data}: any) => {
  //   console.log('first', data);
  const renderItem = ({item}: any) => {
    return (
      <Box mb={5} justifyContent={'center'}>
        <Pressable
          borderWidth={1}
          mr={5}
          borderRadius={6}
          borderColor={COLORS.lightGrey}>
          <Box
            h={120}
            w={Dimensions.get('window').width / 2.4}
            alignItems={'center'}
            justifyContent={'center'}>
            <Image
              source={item?.img}
              style={styles.specialImg}
              alt={'image'}
              resizeMode={'contain'}
            />
          </Box>
          <Box pl={2}>
            <Text>{item?.label}</Text>
            <HStack space={3}>
              <Text>&#8377; {item?.price}</Text>
              <Text textDecorationLine={'line-through'} color={COLORS.cgcolor}>
                &#8377; {item?.discount}
              </Text>
            </HStack>
          </Box>

          <Box
            width={8}
            position={'absolute'}
            bg={'#4F7942'}
            borderTopLeftRadius={5}
            borderBottomRightRadius={5}>
            <HStack alignItems={'center'}>
              <Text
                fontSize={13}
                flexWrap={'wrap'}
                px={1}
                color={COLORS.textWhite}>
                {item?.star}
              </Text>
              <FontAwesome name="star" size={12} color={'#fff'} />
            </HStack>
          </Box>
        </Pressable>
      </Box>
    );
  };
  return (
    <Box mb={3} px={4}>
      <HStack alignItems={'center'} space={3}>
        <Box w={'24%'} h={0.5} bg={COLORS.lightGrey}></Box>
        <HStack>
          <Text fontSize={15} bold>
            Our
          </Text>
          <Text color={'#4F7942'} fontSize={15} bold>
            {' '}
            Special
          </Text>
          <Text fontSize={15} bold>
            {' '}
            Products
          </Text>
        </HStack>
        <Box w={'25%'} h={0.5} bg={COLORS.lightGrey}></Box>
      </HStack>
      <Box alignSelf={'flex-end'} py={1}>
        <Pressable>
          <HStack alignItems={'center'} pr={2} space={1}>
            <Text fontSize={13} bold>
              See All
            </Text>
            <Box bg={'#4F7942'} borderRadius={20}>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={COLORS.textWhite}
              />
            </Box>
          </HStack>
        </Pressable>
      </Box>
      <Box mt={2}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
          numColumns={2}
        />
      </Box>
    </Box>
  );
};

export default SpecialProduct;

const styles = StyleSheet.create({
  specialImg: {
    width: 100,
    height: 100,
  },
});
