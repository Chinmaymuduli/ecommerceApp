import React from 'react';
import {
  Badge,
  Box,
  Center,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useAuth, useStore} from 'app';
import {useAuthFetch, useSwrApi} from 'hooks';
import {User} from 'types';
import {FetchLoader} from 'components/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {VERIFY_IMAGE} from 'assets';

const Profile = () => {
  const navigation = useNavigation<NavigationProps>();
  const {setLoggedIn, userType} = useAuth();

  // console.log({userType});

  const handelLogout = async () => {
    AsyncStorage.setItem('isLoggedIn', 'false')
      .then(() => {
        console.log('Logout Success');
        setLoggedIn(false);
      })
      .catch(error => console.log(error));
  };

  const {data, isValidating} = useSwrApi('user/my-account');
  const authData = data?.data?.data;
  // console.log({authData});
  return (
    <>
      {/* {!isLoading ? ( */}
      {!isValidating ? (
        <Box flex={1} bg={COLORS.textWhite}>
          <Box bg={COLORS.primary}>
            <HStack justifyContent={'space-between'} px={5} py={3}>
              <HStack space={4} alignItems={'center'}>
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={COLORS.textWhite}
                  onPress={() => navigation.goBack()}
                />
                <Text color={COLORS.textWhite} fontSize={17} bold>
                  My Account
                </Text>
              </HStack>
              <HStack space={4} alignItems={'center'}>
                <Ionicons
                  name="search"
                  size={24}
                  color={COLORS.textWhite}
                  onPress={() => navigation.navigate('Search')}
                />
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
                      fontSize: 7,
                    }}>
                    {authData?.cartCount ? authData?.cartCount : 0}
                  </Badge>
                  <Ionicons
                    name="cart"
                    size={24}
                    color={COLORS.textWhite}
                    onPress={() => navigation.navigate('Cart', {})}
                  />
                </Box>
              </HStack>
            </HStack>
          </Box>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box bg={COLORS.primary} h={200}>
              <Center mt={5}>
                <Image
                  source={{
                    uri: authData?.photoURL
                      ? authData?.photoURL
                      : 'https://www.w3schools.com/howto/img_avatar.png',
                  }}
                  h={70}
                  w={70}
                  alt={'profileimg'}
                  borderRadius={50}
                />
                <HStack mt={4} alignItems={'center'} ml={1}>
                  <Text color={COLORS.textWhite} bold>
                    {authData?.displayName}
                  </Text>
                  {authData?.status === 'VERIFY' && (
                    <Image
                      source={VERIFY_IMAGE}
                      h={5}
                      w={5}
                      alt={'verify_img'}
                    />
                  )}
                </HStack>

                <Box alignItems={'center'} mt={4}>
                  <Text color={COLORS.textWhite}>
                    {authData?.phoneNumber
                      ? authData?.phoneNumber
                      : 'No Number Found'}
                  </Text>
                  <HStack alignItems={'center'}>
                    <Text color={COLORS.textWhite}>
                      {authData?.email ? authData?.email : 'No email found'}
                    </Text>
                    {authData?.status === 'ACTIVE' && (
                      <Image
                        source={VERIFY_IMAGE}
                        h={5}
                        w={5}
                        alt={'verify_img'}
                      />
                    )}
                  </HStack>
                </Box>
                <Box position={'absolute'} right={4} bottom={6}>
                  <FontAwesome5
                    name="user-edit"
                    size={20}
                    color={COLORS.textWhite}
                    onPress={() => navigation.navigate('EditProfile')}
                  />
                </Box>
              </Center>
            </Box>
            <Box bg={COLORS.lightGrey}>
              <Box bg={COLORS.textWhite} mx={2} my={2}>
                <Box px={4}>
                  <Box borderBottomWidth={1} borderColor={COLORS.lightGrey}>
                    <Text py={2} mt={2} bold fontSize={15}>
                      My Order
                    </Text>
                  </Box>
                </Box>
                <Pressable
                  alignSelf={'flex-end'}
                  px={4}
                  py={3}
                  onPress={() => navigation.navigate('Order')}>
                  <Text color={COLORS.primary} bold>
                    View All Orders
                  </Text>
                </Pressable>
              </Box>

              <Box bg={COLORS.textWhite} mx={2} mb={2}>
                <Box px={4}>
                  <Box borderBottomWidth={1} borderColor={COLORS.lightGrey}>
                    <Text py={2} mt={2} bold fontSize={15}>
                      My Wishlist
                    </Text>
                  </Box>
                </Box>
                <Pressable
                  alignSelf={'flex-end'}
                  px={4}
                  py={3}
                  onPress={() => navigation.navigate('WishList')}>
                  <Text color={COLORS.primary} bold>
                    View Your Wishlist
                  </Text>
                </Pressable>
              </Box>

              <Box bg={COLORS.textWhite} mx={2} mb={2}>
                <Box px={4}>
                  <Box borderBottomWidth={1} borderColor={COLORS.lightGrey}>
                    <Text py={2} mt={2} bold fontSize={15}>
                      My Review
                    </Text>
                  </Box>
                </Box>
                <Pressable
                  alignSelf={'flex-end'}
                  px={4}
                  py={3}
                  onPress={() => navigation.navigate('MyReview')}>
                  <Text color={COLORS.primary} bold>
                    View Your Review
                  </Text>
                </Pressable>
              </Box>

              <Box bg={COLORS.textWhite} mx={2} mb={2}>
                <Box px={4}>
                  <Box borderBottomWidth={1} borderColor={COLORS.lightGrey}>
                    <Box py={2}>
                      <Text mt={2} bold fontSize={15}>
                        My Addresses
                      </Text>
                    </Box>
                  </Box>
                </Box>
                <Pressable
                  alignSelf={'flex-end'}
                  px={4}
                  py={3}
                  onPress={() =>
                    navigation.navigate('SelectAddress', {isProfile: true})
                  }>
                  <Text color={COLORS.primary} bold>
                    View Your Address
                  </Text>
                </Pressable>
              </Box>
            </Box>

            <Pressable
              borderBottomWidth={1}
              px={4}
              borderColor={COLORS.lightGrey}
              onPress={() => navigation.navigate('Notifications')}>
              <HStack space={2} py={3} alignItems={'center'}>
                <Ionicons name="notifications" size={24} color={COLORS.grey} />
                <Text bold>Notification</Text>
              </HStack>
            </Pressable>
            <Pressable
              borderBottomWidth={1}
              px={4}
              borderColor={COLORS.lightGrey}
              onPress={() => navigation.navigate('EditProfile')}>
              <HStack space={2} py={3} alignItems={'center'}>
                <Ionicons
                  name="settings-sharp"
                  size={24}
                  color={COLORS.grey}
                  onPress={() => navigation.navigate('EditProfile')}
                />
                <Text bold>Account Settings</Text>
              </HStack>
            </Pressable>
            {/* B2B Account data */}
            {/* {userType !== 'b2c' ? ( */}
            {userType !== 'b2c' ? (
              <Pressable
                borderBottomWidth={1}
                px={4}
                borderColor={COLORS.lightGrey}
                onPress={() => navigation.navigate('B2BAccount')}>
                <HStack space={2} py={3} alignItems={'center'}>
                  <MaterialCommunityIcons
                    name="shield-account"
                    size={24}
                    color={COLORS.grey}
                    onPress={() => navigation.navigate('B2BAccount')}
                  />
                  <Text bold>B2B Account</Text>
                </HStack>
              </Pressable>
            ) : null}

            <Pressable
              borderBottomWidth={1}
              px={4}
              borderColor={COLORS.lightGrey}
              onPress={handelLogout}>
              <HStack space={2} py={3} alignItems={'center'}>
                <Ionicons name="exit-outline" size={24} color={COLORS.grey} />
                <Text bold>Logout</Text>
              </HStack>
            </Pressable>
          </ScrollView>
        </Box>
      ) : (
        <FetchLoader />
      )}
    </>
  );
};

export default Profile;
