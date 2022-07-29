import {StyleSheet} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {Box, HStack, Text} from 'native-base';
import {COLORS} from 'configs';
import Entypo from 'react-native-vector-icons/Entypo';
import {ProductType} from 'types';
import {useStore} from 'app';

type Props = {
  item: ProductType;
  setOpenAlert: (previousValue: boolean) => void;
  setAlertMessage: (txt: string) => void;
};
const Counter = ({item, setAlertMessage, setOpenAlert}: Props) => {
  const {addToCart, updateQuantity, removeFromCart, cartItems} = useStore();

  const Selected_Weight = item?.weightAvailability?.reduce((pV, cV) => {
    if ((cV?.currentPrice || 0) > (pV?.currentPrice || 0)) return cV;
    return pV;
  }, {});

  const [count, setCount] = React.useState(0);

  const isCartItem = useMemo(
    () => cartItems.some(i => i.product.id === item.id),
    [cartItems],
  );
  const quantity = useCallback(
    (id: number) => {
      const res = cartItems.filter(i => i.product.id === id)?.[0];
      return res.quantity;
    },
    [cartItems],
  );

  //   console.log({isCartItem, item});

  const increment = (id: number) => {
    setCount(count + 1);
    updateQuantity(id, count);
  };

  const decrement = (id: number) => {
    if (count === 1) {
      setCount(count - 1);
      removeFromCart(id);
      setOpenAlert(true);
      setAlertMessage('Removed from cart');
      setTimeout(() => {
        setOpenAlert(false);
      }, 2000);
      return;
    } else if (count > 1) {
      setCount(count - 1);
      updateQuantity(id, count);
    } else {
      setCount(0);
    }
  };

  const addtoCartItem = () => {
    increment(item?.id), setCount(count + 1);
    addToCart({
      product: item,
      quantity: 1,
      weight: Selected_Weight,
    });

    setOpenAlert(true),
      setAlertMessage('Added to cart'),
      setTimeout(() => {
        setOpenAlert(false);
      }, 4000);
  };
  return (
    <Box
      alignSelf={'flex-end'}
      right={2}
      bg={COLORS.textWhite}
      mt={-5}
      shadow={1}
      borderRadius={5}
      borderColor={COLORS.lightGrey}>
      {isCartItem ? (
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
            <Text>{quantity(item.id)}</Text>
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
            onPress={() => addtoCartItem()}
          />
        </Box>
      )}
    </Box>
  );
};

export default Counter;

const styles = StyleSheet.create({});
