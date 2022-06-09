import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  Actionsheet,
  Alert,
  Box,
  Center,
  FlatList,
  Heading,
  HStack,
  Image,
  Pressable,
  Row,
  ScrollView,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {SPECIALPRODUCT} from '../../constants';
import {COLORS} from 'configs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Accordion, ManageReview, ProductComponent} from 'components/core';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';
import {useAppContext} from 'contexts';
const quantityArr = [
  {label: '250 gm', value: 250, price: 159, discount: 200, offer: '5% off'},
  {label: '500 gm', value: 500, price: 259, discount: 300, offer: '10% off'},
  {label: '700 gm', value: 700, price: 359, discount: 450, offer: '15% off'},
  {label: '1 kg', value: 1000, price: 459, discount: 500, offer: '20% off'},
];

const productData = [
  {
    id: 1,
    title:
      'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
  },
];

type Props = NativeStackScreenProps<PrivateRoutesType, 'ProductDetails'>;

const ProductDetails = ({route, navigation}: Props) => {
  // console.log('object', route.params);
  const [index, setIndex] = useState(0);
  const isCarousel = useRef<any>(null);
  const SLIDER_WIDTH = Dimensions.get('window').width;
  const [count, setCount] = useState(0);
  const [cardBorder, setCardBorder] = useState<any>({
    label: '1 kg',
    value: 1000,
    price: 459,
    discount: 500,
    offer: '20% off',
  });
  const [wishlist, setWishlist] = useState<any>(false);
  const [showAlert, setShowAlert] = useState(false);

  const {isOpen, onOpen, onClose} = useDisclose();

  const {setCartItems, cartItems} = useAppContext();
  // console.log('object', cartItems);
  // console.log('first', route.params);

  const handleCart = (data: any) => {
    setCartItems((prev: any) => [...prev, data]);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };
  const cartDatametch = cartItems.some(
    (item: {id: number | undefined}) => item.id === route.params.id,
  );
  // console.log('faa', cartDatametch);
  const increaseItem = () => {
    setCount(count + 1);
  };
  const decreaseItem = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      setCount(1);
    }
  };
  const renderItem = ({item, index}: any) => {
    return (
      <Box
        // bg={'amber.300'}
        alignItems={'center'}
        h={200}
        justifyContent={'center'}>
        <Image
          alt="image"
          resizeMode="contain"
          source={item.img}
          style={{height: 170, width: 150}}
        />
      </Box>
    );
  };

  const renderSimilarProduct = ({item, index}: any) => {
    return <ProductComponent item={item} />;
  };

  const SelectQuantity = (item: any) => {
    // border color
    setCardBorder(item);
  };

  const handleWishlist = () => {
    setWishlist(!wishlist);
    // set timeout
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <HStack justifyContent={'space-between'} px={3} py={3}>
        <Pressable
          borderWidth={1}
          borderRadius={9}
          justifyContent={'center'}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Box>
          <Ionicons
            name={wishlist ? 'heart' : 'heart-outline'}
            size={30}
            color="green"
            onPress={handleWishlist}
          />
        </Box>
      </HStack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box>
          <Carousel
            data={SPECIALPRODUCT}
            renderItem={renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={300}
            onSnapToItem={index => setIndex(index)}
          />
          <Pagination
            dotsLength={SPECIALPRODUCT.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: '#228B22',
            }}
            tappableDots={true}
            inactiveDotStyle={{
              backgroundColor: 'black',
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </Box>
        <Box bg={COLORS.textWhite} px={3} flex={1}>
          <HStack alignItems={'center'} mt={3} justifyContent={'space-between'}>
            <Box>
              <Heading size={'sm'}>{route.params?.label}</Heading>
            </Box>
            <Box mr={5}>
              <Ionicons
                name="share-social-outline"
                size={25}
                color={COLORS.fadeBlack}
              />
            </Box>
          </HStack>
          <HStack mt={1}>
            <HStack space={2}>
              <FontAwesome name="star" size={20} color={'#F5B21E'} />
              <FontAwesome name="star" size={20} color={'#F5B21E'} />
              <FontAwesome name="star" size={20} color={'#F5B21E'} />
              <FontAwesome name="star" size={20} color={'#F5B21E'} />
              <FontAwesome name="star-o" size={20} color={'#F5B21E'} />
            </HStack>
            <Box
              h={5}
              borderRightWidth={2}
              mx={3}
              borderColor={COLORS.cgcolor}></Box>
            <HStack alignItems={'center'}>
              <Text bold>ID :</Text>
              <Text>
                {' '}
                {route.params?.id
                  ? route.params?.id
                  : Math.floor(Math.random() * 1000000)}
              </Text>
            </HStack>
          </HStack>

          <HStack alignItems={'center'} mt={1}>
            <HStack space={3} alignItems={'center'}>
              <Text bold>
                {/* &#8377;{route.params?.price} */}
                &#8377;
                {cardBorder?.price ? cardBorder?.price : route.params?.price}
              </Text>
              <Text textDecorationLine={'line-through'} fontSize={14}>
                {/* &#8377; {route.params?.discount} */}
                &#8377;{' '}
                {cardBorder?.discount
                  ? cardBorder?.discount
                  : route.params?.discount}
              </Text>
              <Text color={COLORS.cgcolor} bold>
                {/* {route.params?.offer} */}
                {cardBorder?.offer ? cardBorder?.offer : route.params?.offer}
              </Text>
            </HStack>
          </HStack>
          <Box mt={1}>
            <Text color={'#4F7942'} bold>
              Available
            </Text>
          </Box>
          <HStack space={5} mt={3}>
            <Pressable
              bg={'#e4e4e460'}
              borderWidth={1}
              borderColor={COLORS.lightGrey}
              w={'2/4'}
              borderRadius={6}
              onPress={onOpen}>
              <HStack
                py={2}
                justifyContent={'space-between'}
                alignItems={'center'}
                px={2}>
                <Text>
                  {cardBorder?.label ? cardBorder?.label : 'Select Quantity'}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color={COLORS.fadeBlack}
                />
              </HStack>
            </Pressable>
            {/* Counter Section */}
            <Box bg={'#e4e4e460'} justifyContent={'center'} borderRadius={6}>
              <HStack space={5} px={2}>
                <Box bg={COLORS.cgcolor} borderRadius={15}>
                  <AntDesign
                    name="minus"
                    size={20}
                    color={COLORS.textWhite}
                    style={{
                      padding: 2,
                    }}
                    onPress={() => decreaseItem()}
                  />
                </Box>
                <Box>
                  <Text bold>{count}</Text>
                </Box>
                <Box bg={COLORS.cgcolor} borderRadius={15}>
                  <AntDesign
                    style={{
                      padding: 2,
                    }}
                    name="plus"
                    size={20}
                    color={COLORS.textWhite}
                    onPress={increaseItem}
                  />
                </Box>
              </HStack>
            </Box>
          </HStack>
          <Box mt={5} mb={5}>
            {productData?.map(item => (
              <Accordion
                title="Product Details"
                subtitle={item.title}
                key={item.id}
              />
            ))}
          </Box>
          <Box>
            <ManageReview />
          </Box>
          {/* Similar Product */}
          <Box mt={5}>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
              <VStack>
                <Heading size={'xs'} letterSpacing={1}>
                  Similar Products
                </Heading>
                <Text fontSize={13}>Pay less, Get More</Text>
              </VStack>
              <Pressable
                onPress={() => navigation.navigate('ProductDetails', {})}>
                <Text color={COLORS.cgcolor} bold>
                  See All
                </Text>
              </Pressable>
            </HStack>
            <Box mt={1} mb={20}>
              <FlatList
                data={SPECIALPRODUCT}
                renderItem={renderSimilarProduct}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </Box>
          </Box>
        </Box>
      </ScrollView>
      {/* Buttom section */}
      <Box position={'absolute'} px={3} bottom={0} mb={3}>
        <Row>
          {!cartDatametch ? (
            <Pressable
              // onPress={() => navigation.navigate('Cart', {isBack: true})}
              onPress={() => handleCart(route.params)}
              bg={'#C1E1C1'}
              w={160}
              alignItems={'center'}
              borderTopLeftRadius={5}
              borderBottomLeftRadius={5}>
              <Text py={4} color={COLORS.cgcolor} bold>
                Add To Cart
              </Text>
            </Pressable>
          ) : (
            <Pressable
              // onPress={() => navigation.navigate('Cart', {isBack: true})}
              onPress={() => navigation.navigate('Cart', {isBack: true})}
              bg={'#C1E1C1'}
              w={160}
              alignItems={'center'}
              borderTopLeftRadius={5}
              borderBottomLeftRadius={5}>
              <Text py={4} color={COLORS.cgcolor} bold>
                Go To Cart
              </Text>
            </Pressable>
          )}
          <Pressable
            onPress={() => navigation.navigate('OrderSummary', route.params)}
            bg={COLORS.cgcolor}
            w={175}
            borderTopRightRadius={5}
            borderBottomRightRadius={5}
            alignItems={'center'}>
            <Text py={4} color={COLORS.textWhite} bold>
              Buy Now
            </Text>
          </Pressable>
        </Row>
      </Box>
      {/* Actionsheet */}
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box width={'100%'} mb={3} px={3}>
            <Heading size={'sm'}>Select Quantity</Heading>
          </Box>
          <Box w={'100%'} px={3}>
            <Row flexWrap={'wrap'}>
              {quantityArr.map((item, index) => (
                <Pressable
                  width={Dimensions.get('window').width / 2.5}
                  key={index}
                  borderWidth={1}
                  borderRadius={5}
                  bg={'#e4e4e460'}
                  borderColor={
                    cardBorder?.value === item.value ? '#228B22' : '#e4e4e4'
                  }
                  onPress={() => SelectQuantity(item)}
                  w={Dimensions.get('window').width / 2.5}
                  mx={1}
                  my={1}>
                  <Text px={2} py={2}>
                    {item?.label}
                  </Text>
                  {cardBorder?.value === item.value && (
                    <Box
                      bg={'#228B22'}
                      borderTopRightRadius={5}
                      borderBottomLeftRadius={5}
                      alignSelf={'flex-end'}
                      position={'absolute'}>
                      <Ionicons name="checkmark" size={16} color={'#fff'} />
                    </Box>
                  )}
                </Pressable>
              ))}
            </Row>
            <HStack alignItems={'center'} mt={3} ml={5} space={4}>
              <Pressable
                borderWidth={1}
                borderColor={'#228B22'}
                onPress={onClose}
                borderRadius={5}>
                <Text px={10} py={1} color={'#228B22'}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable bg={'#228B22'} borderRadius={5} onPress={onClose}>
                <Text color={COLORS.textWhite} px={10} py={1} bold>
                  Apply
                </Text>
              </Pressable>
            </HStack>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
      {/* Alert Component */}
      {showAlert ? (
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
                  <Text color={'coolGray.800'}>Successfully added!</Text>
                </HStack>
              </HStack>
            </VStack>
          </Alert>
        </Center>
      ) : null}
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});
