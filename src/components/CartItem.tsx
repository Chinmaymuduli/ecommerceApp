import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  HStack,
  Image,
  VStack,
  Text,
  Pressable,
  AlertDialog,
  Button,
} from 'native-base';
import {COLORS} from 'configs';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CartItemType, CartType} from 'types';
import {useStore} from 'app';

type CartItemTypes = {
  item: CartItemType;
  setQuantity?: number | any;
};

const CartItem = ({item, setQuantity}: CartItemTypes) => {
  const {updateQuantity, cartItems, removeFromCart} = useStore();
  const [isOpen, setIsOpen] = React.useState(false);

  // console.log('first', item);

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);

  const increment = (item: CartItemType) => {
    updateQuantity(item?.product?.id, item?.quantity + 1);
  };

  const decrement = (item: CartItemType) => {
    updateQuantity(item?.product?.id, item?.quantity - 1);
    if (item?.quantity < 2) {
      removeFromCart(item?.product?.id);
    }
  };

  // console.log('CartItem', cartItems);

  const handleDelete = (id: number) => {
    removeFromCart(id);
    onClose();
  };
  return (
    <Box
      px={3}
      // py={1}
      borderBottomWidth={1}
      borderBottomColor={COLORS.lightGrey}>
      <HStack py={3}>
        <Box alignItems={'center'} justifyContent={'center'}>
          <Image
            alt="cartImg"
            source={item?.product?.img}
            style={{height: 110, width: 100}}
            resizeMode="contain"
          />
        </Box>
        <VStack px={3} space={3}>
          <HStack space={20}>
            <Text w={100} noOfLines={2}>
              {item?.product?.name}
            </Text>
            <MaterialIcons
              name="delete"
              size={25}
              color={COLORS.danger}
              onPress={() => setIsOpen(!isOpen)}
            />
          </HStack>
          <HStack space={2}>
            <Text color={'#000'} bold>
              &#8377;{item?.weight?.currentPrice}
            </Text>
            <Text textDecorationLine={'line-through'}>
              &#8377;{(item?.weight?.currentPrice || 0) + 100}
            </Text>
          </HStack>
          <Text>{item.weight?.weight}</Text>
        </VStack>
        <Box bg={COLORS.cgcolor} position={'absolute'} top={2} borderRadius={6}>
          <Text color={COLORS.textWhite} fontSize={8} px={1}>
            {item?.weight?.discount} % OFF
          </Text>
        </Box>
        <Box
          bg={'#F8D210'}
          position={'absolute'}
          borderRadius={3}
          bottom={6}
          right={2}>
          <HStack alignItems={'center'} px={1} space={3}>
            <Pressable onPress={() => decrement(item)}>
              <Entypo name="minus" size={18} color={COLORS.fadeBlack} />
            </Pressable>
            <Box>
              <Text bold color={COLORS.fadeBlack}>
                {item?.quantity}
              </Text>
            </Box>
            <Pressable py={1} onPress={() => increment(item)}>
              <Entypo name="plus" size={18} color={COLORS.fadeBlack} />
            </Pressable>
          </HStack>
        </Box>
      </HStack>

      {/* alert dialog */}
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Item</AlertDialog.Header>
          <AlertDialog.Body>
            This will remove cart item . This action cannot be reversed. Deleted
            data can not be recovered.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}>
                Cancel
              </Button>
              <Button
                colorScheme="danger"
                onPress={() => handleDelete(item?.product?.id)}>
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  );
};

export default CartItem;

const styles = StyleSheet.create({});
