import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Alert,
  Badge,
  Box,
  Center,
  FlatList,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from 'configs';
import {wishlist} from 'assets';
import {WishListCard} from 'components';
import {useStore} from 'app';
import {useSwrApi} from 'hooks';

type Props = NativeStackScreenProps<PrivateRoutesType, 'WishList'>;
const WishList = ({navigation}: Props) => {
  const {wishlistItems, cartItems} = useStore();
  const {data, isLoading, mutate} = useSwrApi('wishlists');

  const WishListItem = data?.data?.data?.data;

  const [alertMessage, setAlertMessage] = useState<string>('Item Added');
  const [shownAlert, setShownAlert] = useState<boolean>(false);
  const renderItem = ({item}: any) => {
    return (
      <WishListCard
        item={item}
        setAlertMessage={setAlertMessage}
        setShownAlert={setShownAlert}
        mutateWishlist={mutate}
      />
    );
  };
  return (
    <>
      <Box flex={1} bg={COLORS.textWhite}>
        <HStack
          justifyContent={'space-between'}
          px={4}
          py={3}
          borderBottomWidth={8}
          borderColor={COLORS.lightGrey}>
          <HStack space={4} alignItems={'center'}>
            <Pressable
              borderWidth={1}
              borderRadius={9}
              justifyContent={'center'}
              onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
            <Text bold fontSize={16}>
              My Wishlist
            </Text>
          </HStack>
          <Box>
            <Badge
              colorScheme="danger"
              rounded="full"
              mb={-4}
              mr={-2}
              zIndex={1}
              variant="solid"
              alignSelf="flex-end"
              _text={{
                fontSize: 8,
              }}>
              {cartItems.length ? cartItems.length : 0}
            </Badge>
            <Ionicons
              name={'cart'}
              size={30}
              color="green"
              onPress={() => navigation.navigate('Cart', {})}
            />
          </Box>
        </HStack>
        <Box>
          <FlatList
            // data={wishlistItems.length > 0 ? wishlistItems : []}
            data={WishListItem.length > 0 ? WishListItem : []}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            ListEmptyComponent={() => (
              <Box mt={20}>
                <Center h={400} w={'full'}>
                  <Image
                    source={wishlist}
                    style={styles.wishList_image}
                    alt={'wishlist image'}
                  />
                  <Text bold color={'black'} fontSize={18} mt={10}>
                    No Items in Wishlist
                  </Text>
                </Center>
              </Box>
            )}
          />
        </Box>
        {/* Alert */}
      </Box>
      {shownAlert ? (
        <Center mx={3}>
          <Alert
            w="100%"
            variant={'subtle'}
            colorScheme="success"
            status="success">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack
                flexShrink={1}
                space={2}
                alignItems="center"
                justifyContent="space-between">
                <HStack space={2} flexShrink={1} alignItems="center">
                  <Alert.Icon />
                  <Text color={'coolGray.800'}>{alertMessage}</Text>
                </HStack>
              </HStack>
            </VStack>
          </Alert>
        </Center>
      ) : null}
    </>
  );
};

export default WishList;

const styles = StyleSheet.create({
  wishList_image: {
    width: 300,
    height: 300,
  },
});
