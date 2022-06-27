import {Dimensions, SafeAreaView, Share, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Actionsheet,
  Alert,
  Box,
  Center,
  FlatList,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
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
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {ProductComponent} from 'components/core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';
import {useAppContext} from 'contexts';
import LottieView from 'lottie-react-native';
import {SUCCESSSQUANTITY} from 'assets';
import {Rating} from 'react-native-ratings';
import {
  CartItemType,
  ProductDetailsType,
  ProductType,
  SelectQuantityType,
} from 'types';
import {Accordion, ManageReview, ProductComponent} from 'components';
import {useStore} from 'app';
const quantityArr = [
  {label: '250 gm', value: 250, price: 159, discount: 200, offer: '5% off'},
  {label: '500 gm', value: 500, price: 259, discount: 300, offer: '10% off'},
  {label: '700 gm', value: 700, price: 359, discount: 450, offer: '15% off'},
  {label: '1 kg', value: 1000, price: 459, discount: 500, offer: '20% off'},
];
const B2bProduct = [
  {label: '10 kg', value: 10000, price: 560, discount: 1000, offer: '5%'},
  {label: '20 kg', value: 20000, price: 639, discount: 860, offer: '10%'},
  {label: '30 kg', value: 30000, price: 859, discount: 1200, offer: '15%'},
  {label: '50 kg', value: 50000, price: 999, discount: 1500, offer: '20%'},
];

// const productData = [
//   {
//     id: 1,
//     title:
//       'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
//   },
// ];

type Props = NativeStackScreenProps<PrivateRoutesType, 'ProductDetails'>;

type productType = {
  item: ProductDetailsType;
};

const ProductDetails = ({route, navigation}: Props) => {
  const productdata = route.params.ProductDetailsType;
  // console.log('object566', productdata.inStock);
  const SelecetedWeight = productdata?.weightAvailability?.reduce((pV, cV) => {
    if ((cV?.currentPrice || 0) > (pV?.currentPrice || 0)) return cV;
    return pV;
  }, {});
  // const isCarousel = useRef<any>(null);
  const {userData} = useAppContext();
  const [index, setIndex] = useState(0);
  const SLIDER_WIDTH = Dimensions.get('window').width;
  const [count, setCount] = useState<any>(productdata?.quantity);
  const [chooseWeight, setchooseWeight] = useState<any>(SelecetedWeight);
  const [wishlist, setWishlist] = useState<any>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [addQuantity, setAddQuantity] = useState<any>();
  const [modalDialog, setModalDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState('Successfully added!');

  const {isOpen, onOpen, onClose} = useDisclose();

  // const {setCartItems, cartItems} = useAppContext();

  const {addToCart, cartItems} = useStore();
  console.log('object', productdata.id);

  // useEffect(() => {
  //   if (userData.role === 'b2c') {
  //     return setchooseWeight(quantityArr[0]);
  //   } else {
  //     return setchooseWeight(B2bProduct[0]);
  //   }
  // }, [userData]);

  // console.log('object', chooseWeight);

  const handleCart = (data: ProductType) => {
    // setCartItems((prev: any) => [...prev, data]);
    addToCart({
      product: data,
      quantity: 1,
      weight: SelecetedWeight,
    });
    setShowAlert(true);
    setAlertMessage('Added to Cart');
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  const cartDatametch = cartItems.some(
    item => item?.product?.id === productdata?.id,
  );

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

  const renderItem = ({item}: productType) => {
    return (
      <Box alignItems={'center'} h={200} justifyContent={'center'}>
        <Image
          alt="image"
          resizeMode="contain"
          source={item.img}
          style={{height: 170, width: 150}}
        />
      </Box>
    );
  };

  const renderSimilarProduct = ({item}: productType) => {
    return <ProductComponent item={item} />;
  };

  const SelectQuantity = (item: SelectQuantityType) => {
    // border color
    setchooseWeight(item);
    // setAddQuantity('');
  };

  const handleWishlist = (id: any) => {
    const index = wishlist.indexOf(id);
    if (index > -1) {
      setWishlist(wishlist.filter((item: any) => item !== id));
      setShowAlert(true);
      setAlertMessage('Remove from wishlist');
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } else {
      setWishlist([...wishlist, id]);
      setShowAlert(true);
      setAlertMessage('Added to wishlist');
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  const handelShare = useCallback(async () => {
    try {
      await Share.share({
        message: 'Aloe Vera Bodywash',
        // url: 'https://play.google.com/store/apps/details?id=com.chhattisgarhHerbals',
        title: 'title',
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const BuyNow = () => {
    if (addQuantity) {
      return setModalDialog(true);
    }
    addToCart({
      product: productdata,
      quantity: 1,
      weight: chooseWeight,
    });

    navigation.navigate('OrderSummary', {
      CartItems: [
        {
          // ...route.params?.ProductDetailsType,
          product: productdata,
          quantity: 1,
          weight: chooseWeight,
        },
      ],
    });
  };

  const changeQuantity = (text: string) => {
    if (text.length > 0) {
      setAddQuantity(text.replace(/[^0-9]/g, ''));
      setchooseWeight({});
    } else {
      setAddQuantity('');
      setchooseWeight({
        label: '10 kg',
        value: 10000,
        price: 560,
        discount: 1000,
        offer: '5%',
      });
    }
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
            name={
              wishlist.includes(productdata?.id) ? 'heart' : 'heart-outline'
            }
            size={30}
            color="green"
            onPress={() => handleWishlist(productdata?.id)}
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
            // autoplay={true}
            // loop={true}
          />
          <Pagination
            dotsLength={SPECIALPRODUCT.length}
            activeDotIndex={index}
            // carouselRef={isCarousel}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: '#228B22',
            }}
            // tappableDots={true}
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
              <Heading size={'sm'}>{productdata?.name}</Heading>
            </Box>
            <Box mr={5}>
              <Ionicons
                name="share-social-outline"
                size={25}
                color={COLORS.fadeBlack}
                onPress={handelShare}
              />
            </Box>
          </HStack>
          <HStack mt={1}>
            <HStack>
              <Rating
                type="custom"
                startingValue={productdata.ratings}
                ratingColor={'#F5B21E'}
                tintColor={'#fff'}
                ratingBackgroundColor={COLORS.grey}
                ratingCount={5}
                imageSize={20}
                readonly={true}
              />
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
                {productdata?.id
                  ? productdata?.id
                  : Math.floor(Math.random() * 1000000)}
              </Text>
            </HStack>
          </HStack>

          {/* {userData?.role === 'b2c' ? ( */}
          <HStack alignItems={'center'} mt={1}>
            <HStack space={3} alignItems={'center'}>
              <Text bold>
                &#8377;
                {chooseWeight?.currentPrice
                  ? chooseWeight?.currentPrice
                  : SelecetedWeight?.currentPrice}
              </Text>
              <Text textDecorationLine={'line-through'} fontSize={14}>
                &#8377;{' '}
                {chooseWeight?.currentPrice
                  ? chooseWeight?.currentPrice + 100
                  : (SelecetedWeight?.currentPrice || 0) + 100}
              </Text>
              <Text color={COLORS.cgcolor} bold>
                {chooseWeight?.discount
                  ? chooseWeight?.discount
                  : SelecetedWeight?.discount}
                % off
              </Text>
            </HStack>
          </HStack>
          {/* // ) : 
          // (
          //   <Box>
          //     <HStack
          //       alignItems={'center'}
          //       mt={2}
          //       justifyContent={'space-between'}>
          //       {addQuantity?.length > 0 ? null : (
          //         <Text bold fontSize={18}>
          //           &#8377;
          //           {chooseWeight?.price
          //             ? chooseWeight?.price
          //             : productdata?.currentPrice}
          //         </Text>
          //       )}
          //       <HStack alignItems={'center'} pr={3}>
          //         <Text bold>MOQ :</Text>
          //         <Text bold>10kg</Text>
          //       </HStack>
          //     </HStack>
          //     {addQuantity?.length > 0 ? null : (
          //       <>
          //         <HStack
          //           mt={2}
          //           alignItems={'center'}
          //           justifyContent={'space-between'}
          //           bg={'green.600'}
          //           borderRadius={20}>
          //           <HStack py={1} px={3}>
          //             <Text bold color={COLORS.textWhite}>
          //               MRP
          //             </Text>
          //             <Text bold color={COLORS.textWhite}>
          //               {' '}
          //               &#8377;{' '}
          //               {chooseWeight?.discount
          //                 ? chooseWeight?.discount
          //                 : productdata?.currentPrice + 100}
          //             </Text>
          //           </HStack>
          //           <HStack py={1} px={3} alignItems={'center'}>
          //             <Text bold color={COLORS.textWhite}>
          //               Retail Margin :
          //             </Text>
          //             <Text bold color={COLORS.textWhite}>
          //               {' '}
          //               {chooseWeight?.offer
          //                 ? chooseWeight?.offer
          //                 : productdata?.offer}
          //             </Text>
          //           </HStack>
          //         </HStack>
          //       </>
          //     )}
          //   </Box>
          // )
          // } */}
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
                  {chooseWeight?.weight
                    ? chooseWeight?.weight
                    : 'Select Quantity'}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color={COLORS.fadeBlack}
                />
              </HStack>
            </Pressable>
            {/* Counter Section */}
            {userData?.role === 'b2c' ? (
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
            ) : (
              <VStack
                borderWidth={1}
                borderColor={COLORS.lightGrey}
                borderRadius={5}>
                {/* <Text>Add Quantity</Text> */}
                <Input
                  placeholder="Enter Quantity"
                  bgColor={COLORS.textWhite}
                  h={10}
                  w={150}
                  fontSize={14}
                  value={addQuantity}
                  maxLength={4}
                  onChangeText={text => changeQuantity(text)}
                  keyboardType={'numeric'}
                  InputRightElement={
                    <Text bold pr={2} fontSize={15}>
                      kg
                    </Text>
                  }
                  variant="unstyled"
                />
              </VStack>
            )}
          </HStack>
          <Box mt={5} mb={5}>
            {/* {productData?.map(item => ( */}
            <Accordion
              title="Product Details"
              subtitle={productdata?.description}
              key={productdata.id}
            />
            {/* ))} */}
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
              <Pressable onPress={() => navigation.navigate('Category', {})}>
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
              onPress={() => handleCart(productdata)}
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
            onPress={() => BuyNow()}
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
              {productdata.weightAvailability?.map((pd, index) => (
                <Pressable
                  width={Dimensions.get('window').width / 2.5}
                  key={index}
                  borderWidth={1}
                  borderRadius={5}
                  bg={'#e4e4e460'}
                  borderColor={
                    chooseWeight?.weight === pd.weight ? '#228B22' : '#e4e4e4'
                  }
                  onPress={() => SelectQuantity(pd)}
                  w={Dimensions.get('window').width / 2.5}
                  mx={1}
                  my={1}>
                  <Text px={2} py={2}>
                    {pd?.weight}
                  </Text>
                  {chooseWeight?.weight === pd.weight && (
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
              {/* {userData?.role === 'b2c'
                ? quantityArr.map((item, index) => (
              <Pressable
                width={Dimensions.get('window').width / 2.5}
                key={index}
                borderWidth={1}
                borderRadius={5}
                bg={'#e4e4e460'}
                borderColor={
                  chooseWeight?.value === item.value ? '#228B22' : '#e4e4e4'
                }
                onPress={() => SelectQuantity(item)}
                w={Dimensions.get('window').width / 2.5}
                mx={1}
                my={1}>
                <Text px={2} py={2}>
                  {SelecetedWeight?.label}
                  10Kg
                </Text>
                {chooseWeight?.value === item.value && (
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
              ))
                : B2bProduct.map((item, index) => (
                    <Pressable
                      width={Dimensions.get('window').width / 2.5}
                      key={index}
                      borderWidth={1}
                      borderRadius={5}
                      bg={'#e4e4e460'}
                      borderColor={
                        chooseWeight?.value === item.value ? '#228B22' : '#e4e4e4'
                      }
                      onPress={() => SelectQuantity(item)}
                      w={Dimensions.get('window').width / 2.5}
                      mx={1}
                      my={1}>
                      <Text px={2} py={2}>
                        {item?.label}
                      </Text>
                      {chooseWeight?.value === item.value && (
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
                  ))} */}
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
                  <Text color={'coolGray.800'}>{alertMessage}</Text>
                </HStack>
              </HStack>
            </VStack>
          </Alert>
        </Center>
      ) : null}
      {/* Modal */}
      <Modal
        isOpen={modalDialog}
        // onClose={() => setModalDialog(false)}
        safeAreaTop={true}>
        <Modal.Content maxWidth="350">
          <Modal.Body>
            <Center>
              <LottieView
                source={SUCCESSSQUANTITY}
                loop={false}
                autoPlay
                style={{
                  width: 200,
                  height: 200,
                }}
              />
              <Text textAlign={'center'} fontSize={15} bold mt={-4}>
                Your order request has been sent successfully. Kindly wait
              </Text>
            </Center>
            <Pressable
              alignItems={'center'}
              onPress={() => setModalDialog(false)}>
              <Box
                mt={5}
                borderWidth={2}
                borderRadius={5}
                borderColor={'green.600'}>
                <Text
                  textAlign={'center'}
                  fontSize={18}
                  bold
                  px={10}
                  color={'green.600'}>
                  OK
                </Text>
              </Box>
            </Pressable>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});
