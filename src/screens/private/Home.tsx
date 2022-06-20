import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  Alert,
  Badge,
  Box,
  FlatList,
  Heading,
  HStack,
  Image,
  Input,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {GOOGLE, GOURMEET5, LOGO, MENU2, WOMENEMP} from 'assets';
import {COLORS} from 'configs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  AYUSHPRODUCT,
  CATEGORYARR,
  GOURMETPRODUCT,
  HOMEPRODUCT,
  PERSONALPRODUCT,
  SLIDERDATA,
  SPECIALPRODUCT,
  SWEETPRODUCT,
} from '../../constants';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {AlertComponent, CategoryProduct, SpecialProduct} from 'components/core';

const Home = () => {
  const navigation = useNavigation<NavigationProps>();
  const [openAlert, setOpenAlert] = React.useState<any>(false);
  const [alertMessage, setAlertMessage] =
    React.useState<any>('Added Successfully');
  // console.log('search', search);
  const renderSliderItem = ({item}: {item: any}) => {
    return (
      <Pressable mt={5} onPress={() => navigation.navigate('Category', {})}>
        <ImageBackground
          borderRadius={10}
          source={item.img}
          style={{
            height: 150,
            width: 300,
            marginHorizontal: 10,
          }}>
          <Box ml={150} mt={5}>
            <Text color={COLORS.textWhite} fontSize={12} bold>
              {item?.label}
            </Text>
            <Text bold color={COLORS.textWhite} flexWrap={'wrap'} mt={1}>
              {item?.offer}
            </Text>
            <Box
              mt={2}
              bg={COLORS.textWhite}
              borderRadius={5}
              alignItems={'center'}
              w={'2/3'}>
              <Text color={COLORS.cgcolor} bold py={1}>
                Shop Now
              </Text>
            </Box>
          </Box>
        </ImageBackground>
      </Pressable>
    );
  };

  const renderItem = ({item}: any) => {
    return (
      <Box pr={5} mt={4}>
        <Pressable
          alignItems={'center'}
          onPress={() => navigation.navigate('Category', item)}>
          <Box
            borderWidth={3}
            borderRadius={40}
            p={0.5}
            borderColor={'#4F7942'}>
            <Image
              source={item.img}
              style={styles.imagestyle}
              alt="categoryimg"
              resizeMode="contain"
            />
          </Box>
          <Text fontSize={13}>{item?.label}</Text>
        </Pressable>
      </Box>
    );
  };
  return (
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
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Image alt="menu" source={MENU2} style={styles.menuImg} />
            </Pressable>
            <Image
              source={LOGO}
              alt={'lOgo'}
              style={styles.logoimg}
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
                2
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
        <Box mt={5} pl={3}>
          <HStack alignItems={'center'} justifyContent={'space-between'}>
            <Heading size={'md'}>Categories</Heading>
            <Pressable
              pr={3}
              onPress={() => navigation.navigate('Category', {})}>
              <Text bold color={COLORS.cgcolor}>
                View All
              </Text>
            </Pressable>
          </HStack>
          <FlatList
            data={CATEGORYARR}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </Box>
        {/* Slider Section */}
        <Box>
          <FlatList
            data={SLIDERDATA}
            renderItem={renderSliderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </Box>
        {/* Product Section */}
        <Box mt={2}>
          <CategoryProduct
            title="Ayush Product"
            data={AYUSHPRODUCT}
            setOpenAlert={setOpenAlert}
            setAlertMessage={setAlertMessage}
          />
        </Box>
        <Box bg={'#ECFFDC60'}>
          <CategoryProduct
            title="Gourmet Foods"
            data={GOURMETPRODUCT}
            setOpenAlert={setOpenAlert}
            setAlertMessage={setAlertMessage}
          />
        </Box>
        <Box>
          <CategoryProduct
            title="Personal Products"
            data={PERSONALPRODUCT}
            setOpenAlert={setOpenAlert}
            setAlertMessage={setAlertMessage}
          />
        </Box>
        <Box bg={'#ECFFDC60'}>
          <CategoryProduct
            title="Home Care"
            data={HOMEPRODUCT}
            setOpenAlert={setOpenAlert}
            setAlertMessage={setAlertMessage}
          />
        </Box>
        <Box>
          <CategoryProduct
            title="Sweets"
            data={SWEETPRODUCT}
            setOpenAlert={setOpenAlert}
            setAlertMessage={setAlertMessage}
          />
        </Box>

        {/* Women Empower */}
        <Pressable alignItems={'center'} my={3}>
          <ImageBackground
            source={WOMENEMP}
            style={styles.womenempower}
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
          <SpecialProduct data={SPECIALPRODUCT} />
        </Box>
        {/* last section */}
        <Box
          // mb={100}
          bg={'#ECFFDC60'}
          // bg={'red.100'}
          mx={2}
          justifyContent={'center'}
          borderRadius={5}>
          <HStack>
            <Image
              source={GOURMEET5}
              style={styles.honeyImg}
              alt={'honeyimg'}
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
  );
};

export default Home;

const styles = StyleSheet.create({
  menuImg: {
    width: 30,
    height: 30,
  },
  logoimg: {
    width: 70,
    height: 40,
  },
  imagestyle: {
    width: 70,
    height: 70,
    // borderColor: COLORS.textWhite,
    borderRadius: 40,
  },
  womenempower: {
    width: 350,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  honeyImg: {
    width: 130,
    height: 140,
    // backgroundColor: 'red',
  },
});
