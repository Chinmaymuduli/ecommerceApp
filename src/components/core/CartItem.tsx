import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, HStack, Image, VStack, Text, Pressable} from 'native-base';
import {COLORS} from 'configs';
import Entypo from 'react-native-vector-icons/Entypo';

const CartItem = ({item, setQuantity}: any) => {
  //   console.log('first', setQuantity);

  const increment = (item: any) => {
    setQuantity((prev: any) => {
      const newQuantity = [...prev];
      const index = newQuantity.indexOf(item);
      newQuantity[index].quantity += 1;
      return newQuantity;
    });
  };

  const decrement = (item: any) => {
    if (item.quantity > 1) {
      setQuantity((prev: any) => {
        const newQuantity = [...prev];
        const index = newQuantity.indexOf(item);
        newQuantity[index].quantity -= 1;
        return newQuantity;
      });
    } else {
      return;
    }
  };
  return (
    <Box
      px={3}
      // py={1}
      borderBottomWidth={1}
      borderBottomColor={COLORS.lightGrey}>
      <HStack py={3}>
        <Box alignItems={'center'} justifyContent={'center'}>
          <Image
            alt="cartImg"
            source={item.img}
            style={{height: 110, width: 100}}
            resizeMode="contain"
          />
        </Box>
        <VStack px={3} space={3}>
          <Text>{item?.label}</Text>
          <HStack space={2}>
            <Text color={'#000'} bold>
              &#8377;{item.price}
            </Text>
            <Text textDecorationLine={'line-through'}>
              &#8377;{item.discount}
            </Text>
          </HStack>
          <Text>1 Kg</Text>
        </VStack>
        <Box bg={COLORS.cgcolor} position={'absolute'} top={2} borderRadius={6}>
          <Text color={COLORS.textWhite} fontSize={8} px={1}>
            {item?.offer}
          </Text>
        </Box>
        <Box
          // bg={'#D1B000'}
          bg={'#F8D210'}
          position={'absolute'}
          borderRadius={3}
          bottom={6}
          right={2}>
          <HStack alignItems={'center'} px={1} space={3}>
            <Pressable onPress={() => decrement(item)}>
              <Entypo name="minus" size={18} color={COLORS.fadeBlack} />
            </Pressable>
            <Box>
              <Text bold color={COLORS.fadeBlack}>
                {item.quantity}
              </Text>
            </Box>
            <Pressable py={1} onPress={() => increment(item)}>
              <Entypo name="plus" size={18} color={COLORS.fadeBlack} />
            </Pressable>
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
};

export default CartItem;

const styles = StyleSheet.create({});
