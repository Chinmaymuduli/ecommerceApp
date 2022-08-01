import {Dimensions, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Box, HStack, Image, Pressable, Text} from 'native-base';
import {COLORS} from 'configs';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {useAppContext} from 'contexts';
import Entypo from 'react-native-vector-icons/Entypo';
import {HomeProductType, ProductType} from 'types';

type Props = {
  item: HomeProductType;
};

const SpecialProductCard = ({item}: Props) => {
  // console.log('object', item);
  const navigation = useNavigation<NavigationProps>();
  const [count, setCount] = useState(0);
  const {setCartItems, cartItems} = useAppContext();

  const SelecetedWeight = item?.weightAvailability?.reduce((pV, cV) => {
    if ((cV?.currentPrice || 0) > (pV?.currentPrice || 0)) return cV;
    return pV;
  }, {});

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
      return;
    }
    setCount(0);
  };
  useEffect(() => {
    if (count === 0) {
      const newCartItems = cartItems.filter((data: any) => data.id !== item.id);

      setCartItems(newCartItems);
    }
    return () => {};
  }, [count]);

  const increment = () => {
    setCount(count + 1);
  };
  const AddSpecialCart = (item: HomeProductType) => {
    increment();
    setCartItems((prev: any) => [...prev, item]);
  };
  return (
    <Box mb={5} justifyContent={'center'}>
      <Pressable
        onPress={() =>
          navigation.navigate('ProductDetails', {ProductDetailsType: item})
        }
        borderWidth={1}
        mr={5}
        borderRadius={6}
        borderColor={COLORS.lightGrey}>
        <Box
          h={110}
          w={Dimensions.get('window').width / 2.4}
          alignItems={'center'}
          justifyContent={'center'}>
          <Image
            source={item?.img}
            style={styles.specialImg}
            alt={'image'}
            resizeMode={'contain'}
          />
        </Box>

        <Box pl={2}>
          <Text noOfLines={1}>{item?.name}</Text>
          <HStack space={3}>
            <Text>&#8377; {SelecetedWeight?.currentPrice}</Text>
            <Text textDecorationLine={'line-through'} color={COLORS.primary}>
              &#8377;{' '}
              {((SelecetedWeight?.currentPrice || 0) * 100) /
                (100 - (SelecetedWeight?.discount || 0))}
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
            {SelecetedWeight?.discount} % OFF
          </Text>
        </Box>
      </Pressable>

      <Box
        alignSelf={'flex-end'}
        right={5}
        bg={COLORS.textWhite}
        mt={-5}
        shadow={1}
        borderRadius={5}
        borderColor={COLORS.lightGrey}>
        {cartItems?.some((data: any) => data?.id === item?.id) && count > 0 ? (
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
    </Box>
  );
};

export default SpecialProductCard;

const styles = StyleSheet.create({
  specialImg: {
    width: 100,
    height: 100,
  },
});
