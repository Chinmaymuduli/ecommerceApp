import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, HStack, Image, Pressable, Text} from 'native-base';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {ProductType} from 'types';
import {useStore} from 'app';
import Counter from './Counter';

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
  const Selected_Weight = item?.weightAvailability?.reduce((pV, cV) => {
    if ((cV?.currentPrice || 0) > (pV?.currentPrice || 0)) return cV;
    return pV;
  }, {});

  const {
    cartItems,

    addToWishlist,
    removeFromWishlist,
    wishlistItems,
  } = useStore();

  const navigation = useNavigation<NavigationProps>();

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
            // source={isBussiness ? item?.b2bImg : item?.img}
            source={{
              uri:
                item?.images?.length > 1
                  ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1-r88R2pOX-lj1C6Zn3QO3I_Osu-G3viCm1fUWNVhiDn_mkszDqEn8qXAe3bR1sJo9Pg&usqp=CAU'
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1-r88R2pOX-lj1C6Zn3QO3I_Osu-G3viCm1fUWNVhiDn_mkszDqEn8qXAe3bR1sJo9Pg&usqp=CAU',
            }}
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
            {Selected_Weight?.discount
              ? Selected_Weight?.discount
              : (+((item?.mrp - item?.salePrice) / item?.mrp) * 100).toFixed(0)}
            % OFF
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
            color={COLORS.cgColor}
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
              {Selected_Weight?.currentPrice
                ? Selected_Weight?.currentPrice
                : item?.salePrice}
            </Text>
            <Text fontSize={13} textDecorationLine={'line-through'}>
              &#8377;
              {Selected_Weight?.currentPrice
                ? ((Selected_Weight?.currentPrice || 0) * 100) /
                  (100 - (Selected_Weight?.discount || 0))
                : item?.mrp}
            </Text>
          </HStack>
          {isBusiness ? (
            <HStack>
              <Text fontSize={13} color={COLORS.cgColor} bold>
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
