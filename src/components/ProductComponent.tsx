import {StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from 'configs';
import Entypo from 'react-native-vector-icons/Entypo';
import {Box, HStack, Image, Pressable, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ProductDetailsType} from 'types';
type productType = {
  item: ProductDetailsType;
};

const ProductComponent = ({item}: productType) => {
  return (
    <Box mt={3} overflow={'hidden'} mb={5}>
      <Pressable>
        <Box
          h={120}
          w={120}
          borderWidth={1}
          mr={3}
          alignItems={'center'}
          borderColor={COLORS.lightGrey}
          borderRadius={5}>
          <Image
            alt="image"
            source={item?.img}
            style={styles.image}
            resizeMode={'contain'}
          />
        </Box>
        <Box
          width={8}
          position={'absolute'}
          bg={'#4F7942'}
          borderTopLeftRadius={5}
          borderBottomRightRadius={5}>
          <Text fontSize={10} flexWrap={'wrap'} px={1} color={COLORS.textWhite}>
            {item?.offer}
          </Text>
        </Box>
        <Box position={'absolute'} right={4} borderRadius={10}>
          <Ionicons
            onPress={() => console.log('hello')}
            name="heart-outline"
            size={22}
            color={COLORS.cgcolor}
            style={{
              paddingHorizontal: 2,
              paddingVertical: 2,
            }}
          />
        </Box>
        <Box
          alignSelf={'flex-end'}
          right={2}
          bg={COLORS.textWhite}
          mt={-5}
          shadow={1}
          borderRadius={5}
          borderColor={COLORS.lightGrey}>
          <Entypo
            name="plus"
            size={18}
            color={COLORS.fadeBlack}
            style={{
              paddingHorizontal: 3,
              paddingVertical: 3,
            }}
            onPress={() => console.log('Add Cart', item)}
          />
        </Box>
        <Box w={120}>
          <Text bold fontSize={12} numberOfLines={1}>
            {item?.name}
          </Text>
          <HStack space={2}>
            <Text fontSize={13}>&#8377;{item?.currentPrice}</Text>
            <Text fontSize={13} textDecorationLine={'line-through'}>
              &#8377;{item?.currentPrice + 100}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );
};

export default ProductComponent;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    marginTop: 20,
  },
});
