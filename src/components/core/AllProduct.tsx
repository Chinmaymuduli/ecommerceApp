import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {Box, HStack, Image, Pressable, Text} from 'native-base';
import {COLORS} from 'configs';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {useAppContext} from 'contexts';

const AllProduct = ({item}: any) => {
  const navigation = useNavigation<NavigationProps>();
  const [count, setCount] = React.useState(0);
  const {cartItems, setCartItems} = useAppContext();
  // console.log('first', count);
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = (id: any) => {
    if (count > 0) {
      setCount(count - 1);
      return;
    } else {
      setCount(0);
    }
  };
  useEffect(() => {
    if (count === 0) {
      const newCartItems = cartItems.filter((data: any) => data.id !== item.id);
      setCartItems(newCartItems);
    }
    return () => {};
  }, [count]);

  const AddToCartCategory = (item: any) => {
    increment();
    setCartItems((prev: any) => [...prev, item]);
  };
  return (
    <Box mt={2} overflow={'hidden'} mb={4} px={1}>
      <Pressable onPress={() => navigation.navigate('ProductDetails', item)}>
        <Box
          h={120}
          w={120}
          borderWidth={1}
          mr={2}
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
        <Box
          // mt={1}
          position={'absolute'}
          right={4}
          borderRadius={10}>
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
          // borderWidth={1}
          borderRadius={5}
          borderColor={COLORS.lightGrey}>
          {cartItems?.some((data: any) => data?.id === item?.id) &&
          count > 0 ? (
            <HStack
              bg={'#FFFF0060'}
              w={'120'}
              justifyContent="space-between"
              alignItems={'center'}>
              <Box>
                <Entypo
                  name="minus"
                  size={20}
                  color={COLORS.fadeBlack}
                  onPress={() => decrement(item.id)}
                />
              </Box>
              <Box>
                <Text>{count}</Text>
              </Box>
              <Box>
                <Entypo
                  name="plus"
                  size={18}
                  color={COLORS.fadeBlack}
                  style={{
                    paddingHorizontal: 3,
                    paddingVertical: 3,
                  }}
                  onPress={() => setCount(count + 1)}
                />
              </Box>
            </HStack>
          ) : (
            <Entypo
              name="plus"
              size={18}
              color={COLORS.fadeBlack}
              style={{
                paddingHorizontal: 3,
                paddingVertical: 3,
              }}
              onPress={() => AddToCartCategory(item)}
            />
          )}
        </Box>
        <Box w={120}>
          <Text bold fontSize={12} numberOfLines={1}>
            {item?.label}
          </Text>
          <HStack space={2}>
            <Text fontSize={13}>&#8377;{item?.price}</Text>
            <Text fontSize={13} textDecorationLine={'line-through'}>
              &#8377;{item?.discount}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );
};

export default AllProduct;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    marginTop: 20,
  },
});
