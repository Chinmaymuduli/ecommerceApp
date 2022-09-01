import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from 'configs';
import Entypo from 'react-native-vector-icons/Entypo';
import {Box, HStack, Image, Pressable, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ProductType} from 'types';
import {useStore} from 'app';
import {PRODUCT_PLACEHOLDER} from 'assets';
import {put, remove} from 'api';
import {useIsMounted} from 'hooks';
import {useAppContext} from 'contexts';
type productType = {
  item: any;
};

const ProductComponent = ({item}: productType) => {
  const {wishlistItems, removeFromWishlist, addToWishlist} = useStore();
  const isMounted = useIsMounted();
  const {guestUser} = useAppContext();
  const [loading, setLoading] = useState(false);

  // console.log({item});

  const handleWishlist = async (wishlistItem: ProductType) => {
    try {
      if (item?.isInWishList) {
        isMounted.current && setLoading(true);
        const responseWish = await remove({
          path: `wishlist/${wishlistItem?._id}`,
        });
        // ProductMutate();
        // isMounted.current && setOpenAlert(true);
        // isMounted.current && setAlertMessage('Remove from wishlist');
        // setTimeout(() => {
        //   setOpenAlert(false);
        // }, 2000);
      } else {
        isMounted.current && setLoading(true);
        const res = await put({
          path: 'wishlist',
          body: JSON.stringify({
            productId: wishlistItem?._id,
          }),
        });

        // ProductMutate();
        // if (!isValidating) {
        //   isMounted.current && setOpenAlert(true);
        //   isMounted.current && setAlertMessage('Added to wishlist');
        //   isMounted.current && setCelebrate(true);
        //   setTimeout(() => {
        //     isMounted.current && setOpenAlert(false);
        //     isMounted.current && setCelebrate(false);
        //   }, 1000);
        // }
      }
    } catch (error) {
      console.log(error);
    } finally {
      isMounted.current && setLoading(false);
    }
  };

  const increment = async (id: number) => {
    try {
      isMounted.current && setLoading(true);
      const res = await put({
        path: 'cart/add',
        body: JSON.stringify({
          product: id,
          quantity: 1,
        }),
      });

      // if (res?.status === 200) return ProductMutate();
    } catch (error) {
      console.log(error);
    } finally {
      isMounted.current && setLoading(false);
    }
  };

  const decrement = async (id: number) => {
    try {
      isMounted.current && setLoading(true);
      const res = await put({
        path: 'cart/remove',
        body: JSON.stringify({
          product: id,
          quantity: -1,
        }),
      });
      // if (res?.status === 200) return ProductMutate();
    } catch (error) {
      console.log(error);
    } finally {
      // ProductMutate();
      isMounted.current && setLoading(false);
    }
  };

  const addToCartItem = async () => {
    try {
      isMounted.current && setLoading(true);
      const response = await put({
        path: 'cart/add',
        body: JSON.stringify({
          product: item?._id,
          quantity: 1,
        }),
      });
      console.log({response});
      // setOpenAlert(true),
      //   setAlertMessage('Added to cart'),
      //   setTimeout(() => {
      //     setOpenAlert(false);
      //   }, 4000);
      // if (response.status === 200) return mutate();
    } catch (error) {
      console.log(error);
    } finally {
      // ProductMutate();
      isMounted.current && setLoading(false);
    }
  };
  return (
    <Box mt={3} overflow={'hidden'} mb={5}>
      <Pressable>
        <Box
          overflow={'hidden'}
          h={120}
          w={120}
          borderWidth={1}
          mr={3}
          alignItems={'center'}
          borderColor={COLORS.lightGrey}
          borderRadius={5}>
          <Image
            alt="image"
            source={
              item?.displayImage?.url
                ? {uri: item?.displayImage?.url}
                : PRODUCT_PLACEHOLDER
            }
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
            {(((item?.mrp - item?.salePrice) / item?.mrp) * 100).toFixed(0)}%
            off
          </Text>
        </Box>
        {guestUser === 'true' ? null : (
          <Box position={'absolute'} right={4} borderRadius={10}>
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
              color={COLORS.primary}
              style={{
                paddingHorizontal: 2,
                paddingVertical: 2,
              }}
            />
          </Box>
        )}

        {guestUser === 'true' ? null : (
          <Box
            alignSelf={'flex-end'}
            right={3}
            bg={COLORS.textWhite}
            mt={-5}
            shadow={1}
            borderRadius={5}
            borderColor={COLORS.lightGrey}>
            {item?.isInCart ? (
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
                    onPress={() => decrement(item?._id)}
                  />
                </Box>
                <Box>
                  <Text>{item?.cartQuantity}</Text>
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
                    onPress={() => increment(item?._id)}
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
                  onPress={() => addToCartItem()}
                />
              </Box>
            )}
          </Box>
        )}

        <Box w={120} mt={2}>
          <Text bold fontSize={12} numberOfLines={1}>
            {item?.title}
          </Text>
          <HStack space={2}>
            <Text fontSize={13}>&#8377;{item?.salePrice}</Text>
            <Text fontSize={13} textDecorationLine={'line-through'}>
              &#8377;{item?.mrp}
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
