import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, HStack, Image, Pressable, Text} from 'native-base';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {ProductType} from 'types';
import Counter from './Counter';
import {useSwrApi} from 'hooks';
import {put, remove} from 'api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  item: ProductType;
  setOpenAlert: (previousValue: boolean) => void;
  setAlertMessage: (txt: string) => void;
  isBusiness?: boolean;
};

const HomeCategoryItem = ({
  item,
  setOpenAlert,
  setAlertMessage,
  isBusiness: isBusiness,
}: Props) => {
  const navigation = useNavigation<NavigationProps>();

  //wishhlist
  const {data, isLoading, mutate} = useSwrApi('wishlists');
  const wishListItems = data?.data?.data?.data;

  const handleWishlist = async (wishlistItem: ProductType) => {
    try {
      const accessToken = await AsyncStorage.getItem('access_token');

      const removeWishList = wishListItems?.some(
        (data: {product: {_id: string}}) => {
          return data?.product._id === wishlistItem._id;
        },
      );
      if (removeWishList) {
        await remove({
          path: `wishlist/${wishlistItem?._id}`,
          token: accessToken,
        });
        setOpenAlert(true);
        setAlertMessage('Remove from wishlist');
        setTimeout(() => {
          setOpenAlert(false);
        }, 2000);
      } else {
        await put({
          path: 'wishlist',
          body: JSON.stringify({
            productId: wishlistItem?._id,
          }),
        });
        // console.log({res});
        setOpenAlert(true);
        setAlertMessage('Added to wishlist');
        setTimeout(() => {
          setOpenAlert(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      mutate();
    }
  };

  return (
    <>
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
            overflow={'hidden'}
            borderRadius={5}>
            <Image
              alt="image"
              source={{
                uri:
                  item?.images?.length > 1
                    ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1-r88R2pOX-lj1C6Zn3QO3I_Osu-G3viCm1fUWNVhiDn_mkszDqEn8qXAe3bR1sJo9Pg&usqp=CAU'
                    : 'https://meruherbs.com/wp-content/uploads/2017/07/no-product-image.png',
              }}
              style={styles.image}
              resizeMode={'contain'}
            />
          </Box>
          <Box
            width={8}
            position={'absolute'}
            bg={COLORS.secondary}
            borderTopLeftRadius={5}
            borderBottomRightRadius={5}>
            <Text
              fontSize={10}
              flexWrap={'wrap'}
              px={1}
              color={COLORS.textWhite}>
              {(+((item?.mrp - item?.salePrice) / item?.mrp) * 100).toFixed(0)}%
              OFF
            </Text>
          </Box>
          <Box position={'absolute'} right={4} borderRadius={10}>
            <Ionicons
              onPress={() => handleWishlist(item)}
              name={
                wishListItems?.some((data: {product: {_id: string}}) => {
                  return data?.product?._id === item._id;
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
          {/* Add to cart */}
          <Counter
            item={item}
            setOpenAlert={setOpenAlert}
            setAlertMessage={setAlertMessage}
          />

          <Box w={120}>
            <Text bold fontSize={12} numberOfLines={1}>
              {item?.title ? item?.title : item?.name}
            </Text>
            <HStack space={2}>
              <Text fontSize={13}>
                &#8377;
                {item?.salePrice}
              </Text>
              <Text fontSize={13} textDecorationLine={'line-through'}>
                &#8377;
                {item?.mrp}
              </Text>
            </HStack>
            {isBusiness ? (
              <HStack>
                <Text fontSize={13} color={COLORS.primary} bold>
                  MOQ: {item.b2bQuantity}
                </Text>
              </HStack>
            ) : null}
          </Box>
        </Pressable>
      </Box>
    </>
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
