import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {Box, HStack, Image, Pressable, Stack, Text} from 'native-base';
import {COLORS} from 'configs';
import {Rating} from 'react-native-ratings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ProductType, WishListCardType} from 'types';
import {useStore} from 'app';

type Props = {
  item: ProductType;
  setAlertMessage: (prev: string) => void;
  setShownAlert: (previous: boolean) => void;
};

const WishListCard = ({item, setAlertMessage, setShownAlert}: Props) => {
  const {cartItems, addToCart, removeFromCart, removeFromWishlist} = useStore();
  const SelecetedWeight = item?.weightAvailability?.reduce((pV, cV) => {
    if ((cV?.currentPrice || 0) > (pV?.currentPrice || 0)) return cV;
    return pV;
  }, {});
  const handleAddCart = () => {
    addToCart({
      product: item,
      quantity: 1,
      weight: SelecetedWeight,
    });
    setShownAlert(true);
    setAlertMessage('Added to Cart');
    setTimeout(() => {
      setShownAlert(false);
    }, 4000);
  };

  const removeCart = () => {
    removeFromCart(item.id);
    setShownAlert(true);
    setAlertMessage('Remove from Cart');
    setTimeout(() => {
      setShownAlert(false);
    }, 4000);
  };

  const removeWishlist = () => {
    removeFromWishlist(item.id);
  };

  const cartDatametch = cartItems.some(data => data?.product?.id === item?.id);
  return (
    <>
      <Box
        w={Dimensions.get('window').width / 2.2}
        borderWidth={1}
        m={2}
        borderColor={COLORS.lightGrey}
        borderRadius={5}>
        <Pressable>
          <Image
            source={item?.img}
            style={styles.image}
            alt={'wishlistImg'}
            resizeMode={'contain'}
            bg={'#f0fdf4'}
            borderRadius={5}
          />
          <Stack px={2} space={1}>
            <Text bold color={'gray.400'} mt={2}>
              {item?.name}
            </Text>
            <HStack space={2}>
              <Text fontFamily={'Nunito-Bold'}>
                &#8377;{SelecetedWeight?.currentPrice}
              </Text>
              <Text textDecorationLine={'line-through'} color={'gray.400'}>
                &#8377;{(SelecetedWeight?.currentPrice || 0) + 100}
              </Text>
              <Text color={'green.500'} bold>
                {SelecetedWeight?.discount} % off
              </Text>
            </HStack>
            <HStack>
              <Rating
                type="custom"
                startingValue={item.ratings}
                ratingColor={'green'}
                tintColor={'#fff'}
                ratingBackgroundColor={COLORS.grey}
                ratingCount={5}
                imageSize={17}
                style={{paddingVertical: 5}}
              />
            </HStack>
          </Stack>
          <Pressable
            onPress={removeWishlist}
            position={'absolute'}
            bg={COLORS.textWhite}
            borderRadius={30}
            right={2}
            top={1}>
            <Ionicons
              name="close"
              size={20}
              color={COLORS.danger}
              style={{padding: 4}}
            />
          </Pressable>
        </Pressable>
        {!cartDatametch ? (
          <Pressable px={3} py={3} onPress={handleAddCart}>
            <Box
              borderWidth={1}
              borderRadius={4}
              borderColor={COLORS.lightGrey}>
              <Text textAlign={'center'} color={'#15803d'} bold py={1}>
                Add To Cart
              </Text>
            </Box>
          </Pressable>
        ) : (
          <Pressable px={3} py={3} onPress={removeCart}>
            <Box
              borderWidth={1}
              borderRadius={4}
              borderColor={COLORS.lightGrey}>
              <Text textAlign={'center'} color={'#15803d'} bold py={1}>
                Remove From Cart
              </Text>
            </Box>
          </Pressable>
        )}
      </Box>
    </>
  );
};

export default WishListCard;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 100,
  },
});
