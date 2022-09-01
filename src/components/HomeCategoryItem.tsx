import {Box, HStack, Image, Pressable, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {ProductType} from 'types';
import Counter from './Counter';
import {useIsMounted} from 'hooks';
import {COLORS} from 'configs';
import {put, remove} from 'api';
import React, {useState} from 'react';
import {ProductSkeleton} from '../../src/skeleton';
import {CELEBRATE, PRODUCT_PLACEHOLDER} from 'assets';
import LottieView from 'lottie-react-native';
import {useAppContext} from 'contexts';

type Props = {
  item: ProductType;
  setOpenAlert: (previousValue: boolean) => void;
  setAlertMessage: (txt: string) => void;
  businessType?: string;
  ProductMutate: () => void;
  isValidating?: boolean;
};

const HomeCategoryItem = ({
  item,
  setOpenAlert,
  setAlertMessage,
  businessType,
  ProductMutate,
  isValidating,
}: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const [loading, setLoading] = useState(false);
  const isMounted = useIsMounted();
  const [celebrate, setCelebrate] = useState(false);
  const {guestUser} = useAppContext();

  //wishhlist

  const handleWishlist = async (wishlistItem: ProductType) => {
    try {
      if (item?.isInWishList) {
        isMounted.current && setLoading(true);
        const responseWish = await remove({
          path: `wishlist/${wishlistItem?._id}`,
        });
        ProductMutate();
        isMounted.current && setOpenAlert(true);
        isMounted.current && setAlertMessage('Remove from wishlist');
        setTimeout(() => {
          setOpenAlert(false);
        }, 2000);
      } else {
        isMounted.current && setLoading(true);
        const res = await put({
          path: 'wishlist',
          body: JSON.stringify({
            productId: wishlistItem?._id,
          }),
        });

        ProductMutate();
        if (!isValidating) {
          isMounted.current && setOpenAlert(true);
          isMounted.current && setAlertMessage('Added to wishlist');
          isMounted.current && setCelebrate(true);
          setTimeout(() => {
            isMounted.current && setOpenAlert(false);
            isMounted.current && setCelebrate(false);
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      isMounted.current && setLoading(false);
    }
  };

  return (
    <>
      {/* {isValidating ? (
        <ProductSkeleton />
      ) : ( */}
      <Box mt={3} overflow={'hidden'} mb={5} position={'relative'}>
        <Pressable
          position={'relative'}
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
              source={
                item?.displayImage?.url
                  ? {
                      uri: item?.displayImage?.url,
                    }
                  : PRODUCT_PLACEHOLDER
              }
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
          {guestUser === 'true' ? null : (
            <Box position={'absolute'} right={4} borderRadius={10}>
              {loading ? (
                <ActivityIndicator
                  size={'small'}
                  color={COLORS.primary}
                  style={{marginTop: 1}}
                />
              ) : (
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
              )}
            </Box>
          )}
          {celebrate && (
            <Box
              w={20}
              h={20}
              position={'absolute'}
              right={-13}
              top={-30}
              zIndex={1000}>
              <LottieView source={CELEBRATE} autoPlay loop={true} />
            </Box>
          )}
          {/* Add to cart */}
          {guestUser === 'true' ? (
            <></>
          ) : (
            <Counter
              item={item}
              setOpenAlert={setOpenAlert}
              setAlertMessage={setAlertMessage}
              ProductMutate={ProductMutate}
            />
          )}

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
                  MOQ: {item?.moq} kg
                </Text>
              </HStack>
            ) : null}
          </Box>
        </Pressable>
      </Box>
      {/* )} */}
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
