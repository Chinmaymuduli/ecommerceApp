import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {
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
import {GOOGLE, LOGO, MENU2} from 'assets';
import {COLORS} from 'configs';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CATEGORYARR, SLIDERDATA} from '../../constants';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';

const Home = () => {
  const navigation = useNavigation<NavigationProps>();
  const renderSliderItem = ({item}: {item: any}) => {
    return (
      <Box mt={5}>
        <Image
          alt="img"
          source={item.img}
          style={{
            height: 150,
            width: 300,
            borderRadius: 20,
            marginHorizontal: 10,
          }}
        />
      </Box>
    );
  };

  const renderItem = ({item}: any) => {
    return (
      <Box pr={5} mt={4}>
        <VStack alignItems={'center'}>
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
              bg={'red.100'}
            />
          </Box>
          <Text fontSize={13}>{item?.label}</Text>
        </VStack>
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
            <Pressable onPress={() => console.log('bag')}>
              <Badge
                colorScheme="green"
                rounded="full"
                mb={-4}
                mr={-3}
                zIndex={1}
                variant="solid"
                alignSelf="flex-end"
                _text={{
                  fontSize: 9,
                }}>
                2
              </Badge>
              <Feather name="shopping-bag" size={25} color={COLORS.fadeBlack} />
            </Pressable>

            <Pressable onPress={() => console.log('Profile')}>
              <Ionicons
                name="person-circle"
                size={32}
                color={COLORS.fadeBlack}
              />
            </Pressable>
          </HStack>
        </HStack>
      </Box>
      {/* Body Section */}
      <ScrollView>
        <Box px={3} mt={3}>
          <Box borderWidth={1} borderRadius={10} borderColor={COLORS.lightGrey}>
            <Input
              placeholder="Search your products here "
              bgColor={COLORS.textWhite}
              variant="unstyled"
              borderRadius={10}
              fontSize={15}
              InputLeftElement={
                <Box ml={2}>
                  <Ionicons name="search" size={20} color={COLORS.fadeBlack} />
                </Box>
              }
            />
          </Box>
        </Box>
        <Box mt={5} pl={3}>
          <HStack alignItems={'center'} justifyContent={'space-between'}>
            <Heading size={'md'}>Categories</Heading>
            <Pressable pr={3} onPress={() => navigation.navigate('Category')}>
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
        <Box>
          <FlatList
            data={SLIDERDATA}
            renderItem={renderSliderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </Box>
      </ScrollView>
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
});
