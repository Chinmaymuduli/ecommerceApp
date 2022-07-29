import {ImageBackground, SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Badge,
  Box,
  Heading,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import {GOURMET5, LOGO, MENU2, WOMEN_MP} from 'assets';
import {COLORS} from 'configs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {AlertComponent, FetchLoader} from 'components/core';
import {
  CategoryProducts,
  HomeCategories,
  HomeSlider,
  SpecialProduct,
} from 'components';
import {useStore} from 'app';
import {useAuthFetch, useNotifications} from 'hooks';

const Home = () => {
  const {products, spacialProduct} = useStore();
  // const [productsData, setProductsData] = useState<any>();
  // const [isLoading, setIsLoading] = useState<boolean>();
  // const AYUSHPRODUCTS = products.filter(pd => pd.category === 'ayush products');
  const GOURMET = products.filter(pd => pd.category === 'gourmet foods');
  const PERSONAL_CARE = products.filter(pd => pd.category === 'personal care');
  const HOME_CARE = products.filter(pd => pd.category === 'home care');
  const SWEET = products.filter(pd => pd.category === 'sweets');
  const navigation = useNavigation<NavigationProps>();
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);
  const [alertMessage, setAlertMessage] =
    React.useState<any>('Added Successfully');

  const {notifications} = useNotifications();
  const [product1, setProduct1] = useState();

  const {authData, isLoading} = useAuthFetch<any>({
    path: 'products',
    method: 'GET',
  });

  useEffect(() => {
    const CATEGORY_PRODUCT1 = authData?.data
      ?.filter(
        (item: {category: {name: string}; type: string}) =>
          item?.category?.name === 'Ayush' && item?.type === 'B2C',
      )
      .slice(0, 4);
    setProduct1(CATEGORY_PRODUCT1);
  }, [authData]);
  // console.log('first', product1);
  return (
    <>
      {!isLoading ? (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: COLORS.textWhite,
          }}>
          <Box borderBottomWidth={1} borderColor={COLORS.lightGrey}>
            <HStack
              justifyContent={'space-between'}
              py={2}
              px={4}
              alignItems={'center'}>
              <HStack alignItems={'center'} space={5}>
                <Pressable
                  onPress={() =>
                    navigation.dispatch(DrawerActions.openDrawer())
                  }>
                  <Image alt="menu" source={MENU2} style={styles.menuImg} />
                </Pressable>
                <Image
                  source={LOGO}
                  alt={'lOgo'}
                  style={styles.logo_img}
                  resizeMode={'contain'}
                />
              </HStack>
              <HStack alignItems={'center'} space={7}>
                <Pressable onPress={() => navigation.navigate('WishList')}>
                  <Ionicons name="heart-outline" size={25} color={'#4F7942'} />
                </Pressable>

                <Pressable onPress={() => navigation.navigate('Notifications')}>
                  <Badge
                    colorScheme="green"
                    rounded="full"
                    mb={-4}
                    mr={-2}
                    zIndex={1}
                    variant="solid"
                    alignSelf="flex-end"
                    _text={{
                      fontSize: 9,
                    }}>
                    {notifications?.length ? notifications?.length : 0}
                  </Badge>
                  <Ionicons
                    name="notifications-outline"
                    size={27}
                    color={COLORS.fadeBlack}
                  />
                </Pressable>
              </HStack>
            </HStack>
          </Box>
          {/* Body Section */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box px={3} mt={3}>
              <Pressable
                onPress={() => navigation.navigate('Search')}
                borderWidth={1}
                borderRadius={10}
                borderColor={COLORS.lightGrey}>
                <HStack py={3} space={3} px={3}>
                  <Ionicons name="search" size={20} color={COLORS.fadeBlack} />
                  <Box>
                    <Text color={COLORS.grey}>Search your products</Text>
                  </Box>
                </HStack>
              </Pressable>
            </Box>
            {/* Category Section */}
            <HomeCategories />

            {/* Slider Section */}
            <HomeSlider />

            {/* Product Section */}
            <Box mt={2}>
              <CategoryProducts
                title="Ayush Product"
                // data={authData}
                data={product1}
                setOpenAlert={setOpenAlert}
                setAlertMessage={setAlertMessage}
              />
            </Box>
            <Box bg={'#ECFFDC60'}>
              <CategoryProducts
                title="Gourmet Foods"
                data={GOURMET}
                setOpenAlert={setOpenAlert}
                setAlertMessage={setAlertMessage}
              />
            </Box>
            <Box>
              <CategoryProducts
                title="Personal Products"
                data={PERSONAL_CARE}
                setOpenAlert={setOpenAlert}
                setAlertMessage={setAlertMessage}
              />
            </Box>
            <Box bg={'#ECFFDC60'}>
              <CategoryProducts
                title="Home Care"
                data={HOME_CARE}
                setOpenAlert={setOpenAlert}
                setAlertMessage={setAlertMessage}
              />
            </Box>
            <Box>
              <CategoryProducts
                title="Sweets"
                data={SWEET}
                setOpenAlert={setOpenAlert}
                setAlertMessage={setAlertMessage}
              />
            </Box>

            {/* Women Empower */}
            <Pressable alignItems={'center'} my={3}>
              <ImageBackground
                source={WOMEN_MP}
                style={styles.women_empower}
                borderRadius={5}
                resizeMode={'cover'}>
                <Box>
                  <Text color={COLORS.textWhite} textAlign={'center'} bold>
                    From the heart of Chhattisgarh
                  </Text>
                  <Heading
                    mt={2}
                    color={'#98FB98'}
                    textAlign={'center'}
                    size={'md'}>
                    EMPOWERING TRIBAL WOMEN
                  </Heading>
                  <Box
                    mt={2}
                    shadow={1}
                    bg={COLORS.textWhite}
                    alignSelf={'center'}
                    borderWidth={1}
                    borderColor={'#4F7942'}
                    borderRadius={10}>
                    <Text px={3} py={1} color={'#4F7942'}>
                      Know More
                    </Text>
                  </Box>
                </Box>
              </ImageBackground>
            </Pressable>

            {/* Special Product Section */}
            <Box mt={4}>
              <SpecialProduct data={spacialProduct} />
            </Box>
            {/* last section */}
            <Box
              mb={100}
              bg={'#ECFFDC60'}
              mx={2}
              justifyContent={'center'}
              borderRadius={5}>
              <HStack>
                <Image
                  source={GOURMET5}
                  style={styles.honeyImg}
                  alt={'honey_img'}
                  resizeMode={'contain'}
                />
                <Box justifyContent={'center'} alignItems={'center'}>
                  <Text>HEALTHY FOOD</Text>
                  <Heading size={'xs'} mt={1}>
                    OUR BEST SELLING PRODUCT
                  </Heading>
                  <Text mt={1}>Super Offer Up TO 50% OFF</Text>
                  <Box bg={COLORS.cgcolor} borderRadius={10} mt={1}>
                    <Text px={3} py={1} color={COLORS.textWhite}>
                      Shop Now
                    </Text>
                  </Box>
                </Box>
              </HStack>
            </Box>
          </ScrollView>
          {/* Alert */}
          <AlertComponent
            openAlert={openAlert}
            setOpenAlert={setOpenAlert}
            alertMessage={alertMessage}
          />
        </SafeAreaView>
      ) : (
        <FetchLoader />
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  menuImg: {
    width: 30,
    height: 30,
  },
  logo_img: {
    width: 70,
    height: 40,
  },

  women_empower: {
    width: 350,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  honeyImg: {
    width: 130,
    height: 140,
  },
});
