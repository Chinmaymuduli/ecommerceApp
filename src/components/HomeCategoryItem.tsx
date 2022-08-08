import {Box, HStack, Image, Pressable, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {ProductType} from 'types';
import Counter from './Counter';
import {useSwrApi} from 'hooks';
import {COLORS} from 'configs';
import {put, remove} from 'api';
import React from 'react';

type Props = {
  item: ProductType;
  setOpenAlert: (previousValue: boolean) => void;
  setAlertMessage: (txt: string) => void;
  businessType?: string;
  mutate: () => void;
};

const HomeCategoryItem = ({
  item,
  setOpenAlert,
  setAlertMessage,
  businessType,
  mutate,
}: Props) => {
  const navigation = useNavigation<NavigationProps>();

  //wishhlist
  const {data} = useSwrApi('wishlists');
  const wishListItems = data?.data?.data?.data;

  const handleWishlist = async (wishlistItem: ProductType) => {
    try {
      const removeWishList = wishListItems?.some(
        (data: {product: {_id: string}}) => {
          return data?.product._id === wishlistItem._id;
        },
      );
      if (removeWishList) {
        const responseWish = await remove({
          path: `wishlist/${wishlistItem?._id}`,
        });
        console.log({responseWish});
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
              name={item?.isInWishList ? 'heart' : 'heart-outline'}
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
            mutate={mutate}
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
            {businessType === 'b2b' ? (
              <HStack>
                <Text fontSize={13} color={COLORS.primary} bold>
                  MOQ: 10 kg
                  {/* MOQ: {item.b2bQuantity} */}
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
