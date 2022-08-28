import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {Box, HStack, Image, Pressable, Text} from 'native-base';
import {COLORS} from 'configs';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import Entypo from 'react-native-vector-icons/Entypo';
import {ProductType} from 'types';
import {put} from 'api';
import {SpecialProductSkeleton} from '../../src/skeleton';
import {PRODUCT_PLACEHOLDER} from 'assets';
import {useAppContext} from 'contexts';

type Props = {
  item: ProductType;
  isValidating?: boolean;
  mutate: () => void;
};

const SpecialProductCard = ({item, isValidating, mutate}: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const {guestUser} = useAppContext();
  const decrement = async () => {
    try {
      const res = await put({
        path: 'cart/remove',
        body: JSON.stringify({
          product: item._id,
          quantity: -1,
        }),
      });
      if (res.status === 200) return mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const increment = async () => {
    try {
      const res = await put({
        path: 'cart/add',
        body: JSON.stringify({
          product: item._id,
          quantity: 1,
        }),
      });

      if (res.status === 200) return mutate();
    } catch (error) {
      console.log(error);
    }
  };
  const AddSpecialCart = async (item: ProductType) => {
    try {
      const response = await put({
        path: 'cart/add',

        body: JSON.stringify({
          product: item?._id,
          quantity: 1,
        }),
      });
      if (response?.status === 200) return mutate();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isValidating ? (
        <SpecialProductSkeleton />
      ) : (
        <Box
          mb={5}
          justifyContent={'space-between'}
          w={Dimensions.get('window').width / 2.2}>
          <Pressable
            onPress={() =>
              navigation.navigate('ProductDetails', {ProductDetailsType: item})
            }
            borderWidth={1}
            mr={3}
            borderRadius={6}
            borderColor={COLORS.lightGrey}>
            <Box h={110} alignItems={'center'} justifyContent={'center'}>
              <Image
                source={
                  item?.displayImage?.url
                    ? {
                        uri: item?.displayImage?.url,
                      }
                    : PRODUCT_PLACEHOLDER
                }
                style={styles.specialImg}
                alt={'image'}
                resizeMode={'contain'}
              />
            </Box>

            <Box pl={2}>
              <Text noOfLines={1}>{item?.title}</Text>
              <HStack space={3}>
                <Text>&#8377; {item?.salePrice}</Text>
                <Text
                  textDecorationLine={'line-through'}
                  color={COLORS.primary}>
                  &#8377; {item?.mrp}
                </Text>
              </HStack>
            </Box>

            <Box
              width={8}
              position={'absolute'}
              bg={'COLORS.secondary'}
              borderTopLeftRadius={5}
              alignItems={'center'}
              borderBottomRightRadius={5}>
              <Text fontSize={10} flexWrap={'wrap'} color={COLORS.textWhite}>
                {(((item?.mrp - item?.salePrice) / item?.mrp) * 100).toFixed(2)}{' '}
                % OFF
              </Text>
            </Box>
          </Pressable>

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
                  w={'152'}
                  justifyContent="space-between"
                  alignItems={'center'}>
                  <Box>
                    <Entypo
                      name="minus"
                      size={20}
                      color={COLORS.fadeBlack}
                      onPress={() => decrement()}
                    />
                  </Box>
                  <Box>
                    <Text>{item.cartQuantity}</Text>
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
                      onPress={increment}
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
                    onPress={() => AddSpecialCart(item)}
                  />
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default SpecialProductCard;

const styles = StyleSheet.create({
  specialImg: {
    width: 100,
    height: 100,
  },
});
