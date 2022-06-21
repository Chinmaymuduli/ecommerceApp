import {StyleSheet} from 'react-native';
import React from 'react';
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

const CartItem = ({item, setQuantity}: any) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);

  const increment = (item: any) => {
    setQuantity((prev: any) => {
      const newQuantity = [...prev];
      const index = newQuantity.indexOf(item);
      newQuantity[index].quantity += 1;
      return newQuantity;
    });
  };

  const decrement = (item: any) => {
    if (item.quantity > 1) {
      setQuantity((prev: any) => {
        const newQuantity = [...prev];
        const index = newQuantity.indexOf(item);
        newQuantity[index].quantity -= 1;
        return newQuantity;
      });
    } else {
      return;
    }
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
            source={item.img}
            style={{height: 110, width: 100}}
            resizeMode="contain"
          />
        </Box>
        <VStack px={3} space={3}>
          <HStack space={20}>
            <Text>{item?.label}</Text>
            <MaterialIcons
              name="delete"
              size={25}
              color={COLORS.danger}
              onPress={() => setIsOpen(!isOpen)}
            />
          </HStack>
          <HStack space={2}>
            <Text color={'#000'} bold>
              &#8377;{item.price}
            </Text>
            <Text textDecorationLine={'line-through'}>
              &#8377;{item.discount}
            </Text>
          </HStack>
          <Text>1 Kg</Text>
        </VStack>
        <Box bg={COLORS.cgcolor} position={'absolute'} top={2} borderRadius={6}>
          <Text color={COLORS.textWhite} fontSize={8} px={1}>
            {item?.offer}
          </Text>
        </Box>
        <Box
          // bg={'#D1B000'}
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
                {item.quantity}
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
              <Button colorScheme="danger" onPress={onClose}>
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
