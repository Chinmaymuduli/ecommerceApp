import {StyleSheet} from 'react-native';
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
import {useStore} from 'app';
import {useFetch} from 'hooks';
import {User} from 'types';

const Profile = () => {
  const navigation = useNavigation<NavigationProps>();
  const {cartItems} = useStore();
  const {data} = useFetch<User>('user');
  console.log({data});
  return (
    <Box flex={1} bg={COLORS.textWhite}>
      <Box bg={COLORS.cgcolor}>
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
                {cartItems.length ? cartItems.length : 0}
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
        <Box bg={COLORS.cgcolor} h={200}>
          <Center mt={5}>
            <Image
              source={{uri: 'https://www.w3schools.com/howto/img_avatar.png'}}
              h={70}
              w={70}
              alt={'profileimg'}
              borderRadius={50}
            />
            <Text color={COLORS.textWhite} mt={4} bold>
              {data?.results?.displayName}
            </Text>

            <Box alignItems={'center'} mt={4}>
              <Text color={COLORS.textWhite}>+91 1234567890</Text>
              <Text color={COLORS.textWhite}>{data?.results?.email}</Text>
            </Box>
            <Box position={'absolute'} right={4} bottom={3}>
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
              <Text color={COLORS.cgcolor} bold>
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
              <Text color={COLORS.cgcolor} bold>
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
              <Text color={COLORS.cgcolor} bold>
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
                  <Text mt={1}>k-20 , Bhubaneswar , Odisha - 750127</Text>
                </Box>
              </Box>
            </Box>
            <Pressable
              alignSelf={'flex-end'}
              px={4}
              py={3}
              // onPress={() =>
              //   navigation.navigate('SelectAddress', {
              //     SelectProductData: [],
              //   })
              // }
            >
              <Text color={COLORS.cgcolor} bold>
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
        <Box borderBottomWidth={1} px={4} borderColor={COLORS.lightGrey}>
          <HStack space={2} py={3} alignItems={'center'}>
            <Ionicons name="exit-outline" size={24} color={COLORS.grey} />
            <Text bold>Logout</Text>
          </HStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default Profile;

const styles = StyleSheet.create({});
