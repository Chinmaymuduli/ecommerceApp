import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {
  Badge,
  Box,
  Center,
  Fab,
  FlatList,
  HStack,
  Icon,
  Image,
  Pressable,
  Stack,
  Text,
} from 'native-base';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from 'configs';
import {AYUSH_1, AYUSH_2, FAVORITE, wishlist} from 'assets';
import {Rating} from 'react-native-ratings';
import {Empty} from 'components/core';

const wishlistArr = [
  {
    label: 'Mahua Laddu',
    img: AYUSH_1,
    price: 250,
    discount: 350,
    offer: '20% off',
    ratingsby: 3,
  },
  {
    label: 'Jyotishmati Oil',
    img: AYUSH_2,
    price: 499,
    discount: 599,
    offer: '20% off',
    ratingsby: 4,
  },
  {
    label: 'Jyotishmati Oil',
    img: AYUSH_2,
    price: 499,
    discount: 599,
    offer: '20% off',
    ratingsby: 4,
  },
  // {label:"Mahua Laddu", img:AYUSH_1, price:250 , discount:350, offer:"20% OFF"},
];

type Props = NativeStackScreenProps<PrivateRoutesType, 'WishList'>;
const WishList = ({navigation}: Props) => {
  const [ratings, setRatings] = React.useState(4);
  const renderItem = ({item}: any) => {
    return (
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
              {item?.label}
            </Text>
            <HStack space={2}>
              <Text fontFamily={'Nunito-Bold'}>&#8377;{item?.price}</Text>
              <Text textDecorationLine={'line-through'} color={'gray.400'}>
                &#8377;{item?.discount}
              </Text>
              <Text color={'green.500'} bold>
                {item?.offer}
              </Text>
            </HStack>
            <HStack>
              <Rating
                type="custom"
                startingValue={item.ratingsby}
                ratingColor={'green'}
                tintColor={'#fff'}
                ratingBackgroundColor={COLORS.grey}
                ratingCount={5}
                imageSize={17}
                //   onFinishRating={(rating: React.SetStateAction<number>) => {
                //     setRatings(rating);
                //   }}
                style={{paddingVertical: 5}}
              />
            </HStack>
          </Stack>
          <Pressable
            onPress={() => console.log('pressed')}
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
        <Box px={3} py={3}>
          <Box borderWidth={1} borderRadius={4} borderColor={COLORS.lightGrey}>
            <Text textAlign={'center'} color={'#15803d'} bold py={1}>
              Add To Cart
            </Text>
          </Box>
        </Box>
      </Box>
    );
  };
  return (
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
          <Badge // bg="red.400"
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
            2
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
          data={wishlistArr.length > 0 ? wishlistArr : []}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          ListEmptyComponent={() => (
            <Box mt={20}>
              <Center h={400} w={'full'}>
                <Image
                  source={wishlist}
                  style={styles.wishListimage}
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
    </Box>
  );
};

export default WishList;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 100,
  },
  wishListimage: {
    width: 300,
    height: 300,
  },
});
