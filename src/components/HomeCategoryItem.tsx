import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, HStack, Image, Pressable, Text} from 'native-base';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {ProductType} from 'types';
import {useStore} from 'app';
import Counter from './Counter';

type Props = {
  item: ProductType;
  setOpenAlert: (previousValue: boolean) => void;
  setAlertMessage: (txt: string) => void;
  isBussiness?: boolean;
};

const HomeCategoryItem = ({
  item,
  setOpenAlert,
  setAlertMessage,
  isBussiness,
}: Props) => {
  // console.log('object', isBussiness);
  const SelecetedWeight = item?.weightAvailability?.reduce((pV, cV) => {
    if ((cV?.currentPrice || 0) > (pV?.currentPrice || 0)) return cV;
    return pV;
  }, {});

  const {
    addToCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    addToWishlist,
    removeFromWishlist,
    wishlistItems,
  } = useStore();

  const navigation = useNavigation<NavigationProps>();
  // const [count, setCount] = React.useState(0);

  const cartItemMetch = cartItems.some(
    cartData => cartData.product.id === item.id,
  );

  //wishhlist
  const handleWishlist = (wishlistItem: ProductType) => {
    const removeWishList = wishlistItems.some(data => {
      return data.id === wishlistItem.id;
    });

    if (removeWishList) {
      removeFromWishlist(wishlistItem?.id);
      setOpenAlert(true);
      setAlertMessage('Remove from wishlist');
      setTimeout(() => {
        setOpenAlert(false);
      }, 2000);
    } else {
      addToWishlist(wishlistItem);
      setOpenAlert(true);
      setAlertMessage('Added to wishlist');
      setTimeout(() => {
        setOpenAlert(false);
      }, 2000);
    }
  };

  //   add to cart logic //
  // const increment = (id: number) => {
  //   setCount(count + 1);
  //   updateQuantity(id, count);
  // };

  // const decrement = (id: number) => {
  //   if (count === 1) {
  //     setCount(count - 1);
  //     removeFromCart(id);
  //     setOpenAlert(true);
  //     setAlertMessage('Removed from cart');
  //     setTimeout(() => {
  //       setOpenAlert(false);
  //     }, 2000);
  //     return;
  //   } else if (count > 1) {
  //     setCount(count - 1);
  //     updateQuantity(id, count);
  //   } else {
  //     setCount(0);
  //   }
  // };

  // const addtoCartItem = (data: ProductType) => {
  //   increment(data?.id),
  //     addToCart({
  //       product: data,
  //       quantity: 1,
  //       weight: SelecetedWeight,
  //     }),
  //     setOpenAlert(true),
  //     setAlertMessage('Added to cart'),
  //     setTimeout(() => {
  //       setOpenAlert(false);
  //     }, 4000);
  // };
  return (
    <Box mt={3} overflow={'hidden'} mb={5}>
      <Pressable
        onPress={() =>
          navigation.navigate('ProductDetails', {ProductDetailsType: item})
        }>
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
            source={isBussiness ? item?.b2bImg : item?.img}
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
            {SelecetedWeight?.discount}% OFF
          </Text>
        </Box>
        <Box
          // mt={1}

          position={'absolute'}
          right={4}
          borderRadius={10}>
          <Ionicons
            onPress={() => handleWishlist(item)}
            name={
              wishlistItems.some(data => {
                return data?.id === item.id;
              })
                ? 'heart'
                : 'heart-outline'
            }
            size={22}
            color={COLORS.cgcolor}
            style={{
              paddingHorizontal: 2,
              paddingVertical: 2,
            }}
          />
        </Box>
        {/* Add to cart */}
        <Counter
          item={item}
          setOpenAlert={setOpenAlert}
          setAlertMessage={setAlertMessage}
        />
        {/* <Box
          alignSelf={'flex-end'}
          right={2}
          bg={COLORS.textWhite}
          mt={-5}
          shadow={1}
          borderRadius={5}
          borderColor={COLORS.lightGrey}>
          {cartItems?.some((data: any) => data?.product?.id === item?.id) &&
          count > 0 ? (
            <HStack
              bg={'#FFFF0060'}
              w={'125'}
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
                  onPress={() => increment(item.id)}
                />
              </Box>
            </HStack>
          ) : (
            <Box>
              <Entypo
                name="plus"
                size={18}
                color={COLORS.fadeBlack}
                style={{
                  paddingHorizontal: 3,
                  paddingVertical: 3,
                }}
                onPress={() => addtoCartItem(item)}
              />
            </Box>
          )}
        </Box> */}

        <Box w={120}>
          <Text bold fontSize={12} numberOfLines={1}>
            {item?.name}
          </Text>
          <HStack space={2}>
            <Text fontSize={13}>&#8377;{SelecetedWeight?.currentPrice}</Text>
            <Text fontSize={13} textDecorationLine={'line-through'}>
              &#8377;
              {((SelecetedWeight?.currentPrice || 0) * 100) /
                (100 - (SelecetedWeight?.discount || 0))}
            </Text>
          </HStack>
          {isBussiness ? (
            <HStack>
              <Text fontSize={13} color={COLORS.cgcolor} bold>
                MOQ: {item.b2bQuantity}
              </Text>
            </HStack>
          ) : null}
        </Box>
      </Pressable>
    </Box>
  );
};

export default HomeCategoryItem;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    marginTop: 20,
  },
});
